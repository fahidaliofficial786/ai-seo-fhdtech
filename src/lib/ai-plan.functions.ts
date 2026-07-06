import { createServerFn } from "@tanstack/react-start";

export interface AiPlanResult {
  ok: boolean;
  error?: string;
  summary?: string;
  steps?: { title: string; detail: string; priority: "critical" | "high" | "medium" }[];
}

interface PlanInput {
  url: string;
  score: number;
  grade: string;
  platforms: string[];
  issues: { label: string; status: string; impact?: string; category: string }[];
}

export const generateAiPlan = createServerFn({ method: "POST" })
  .inputValidator((data: PlanInput) => {
    if (!data?.url) throw new Error("url required");
    return {
      url: String(data.url).slice(0, 2048),
      score: Number(data.score) || 0,
      grade: String(data.grade || "F"),
      platforms: (data.platforms || []).slice(0, 8),
      issues: (data.issues || []).slice(0, 40),
    };
  })
  .handler(async ({ data }): Promise<AiPlanResult> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!lovableKey && !geminiKey) {
      return { ok: false, error: "AI is not configured. Please add GEMINI_API_KEY in settings." };
    }

    const failing = data.issues.filter((i) => i.status !== "pass");
    const issueList = failing
      .map((i) => `- [${i.impact ?? "medium"}] (${i.category}) ${i.label}: ${i.status}`)
      .join("\n");

    const prompt = `You are a senior AI-SEO consultant. A website was audited.

URL: ${data.url}
Overall score: ${data.score}/100 (grade ${data.grade})
Detected platform(s): ${data.platforms.join(", ") || "unknown"}

Failing/warning checks:
${issueList || "None"}

Return ONLY minified JSON matching this shape:
{"summary":"2-3 sentence plain-English verdict focused on AI search + SEO","steps":[{"title":"short action","detail":"one concrete sentence on how to fix and why it matters for AI search / SEO","priority":"critical|high|medium"}]}
Give 4 to 7 steps, ordered by impact. No markdown, no code fences.`;

    try {
      let text = "";
      if (geminiKey) {
        // Direct call to Google Gemini API (no external sdk required, works natively on Edge/Cloudflare)
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
              },
            }),
          },
        );
        if (!res.ok) {
          throw new Error(`Gemini API returned status ${res.status}`);
        }
        const resultJson = await res.json();
        text = resultJson?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } else {
        // Fallback to Lovable Gateway
        const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
        const { generateText } = await import("ai");
        const gateway = createLovableAiGatewayProvider(lovableKey!);
        const response = await generateText({
          model: gateway("google/gemini-2.5-flash"),
          prompt,
        });
        text = response.text;
      }

      const clean = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const start = clean.indexOf("{");
      const end = clean.lastIndexOf("}");
      const json = JSON.parse(clean.slice(start, end + 1));
      return {
        ok: true,
        summary: String(json.summary || ""),
        steps: Array.isArray(json.steps)
          ? json.steps
              .slice(0, 7)
              .map((s: { title?: string; detail?: string; priority?: string }) => ({
                title: String(s.title || "").slice(0, 120),
                detail: String(s.detail || "").slice(0, 400),
                priority: (["critical", "high", "medium"].includes(String(s.priority))
                  ? s.priority
                  : "medium") as "critical" | "high" | "medium",
              }))
          : [],
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "AI request failed";
      if (msg.includes("429"))
        return { ok: false, error: "AI rate limit reached. Try again shortly." };
      if (msg.includes("402"))
        return { ok: false, error: "AI credits exhausted. Please add credits." };
      return { ok: false, error: "AI action plan could not be generated." };
    }
  });

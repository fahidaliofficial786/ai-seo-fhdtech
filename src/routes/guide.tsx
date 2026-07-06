import { createFileRoute } from "@tanstack/react-router";
import { Bot, FileCode, Search, Quote } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScanForm } from "@/components/scan-form";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "AI SEO Guide — llms.txt, AI Crawlers & AI Search | FHDTech" },
      {
        name: "description",
        content:
          "Learn how AI search works: llms.txt, GPTBot, ClaudeBot, PerplexityBot, Google AI Mode, and how to make your AI-generated website citable by ChatGPT, Gemini, Claude and Perplexity.",
      },
      { property: "og:title", content: "The AI SEO Guide for AI-Generated Websites" },
      {
        property: "og:description",
        content:
          "Understand AI crawlers, llms.txt and AI search optimization to get cited by ChatGPT, Gemini, Claude and Perplexity.",
      },
      { property: "og:url", content: "https://aiseo.fhdtech.com/guide" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/guide" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to rank in AI search",
          description:
            "Understand AI crawlers, llms.txt and AI search optimization to get cited by ChatGPT, Gemini, Claude and Perplexity.",
          author: { "@type": "Organization", name: "FHDTech" },
          publisher: {
            "@type": "Organization",
            name: "FHDTech",
            url: "https://aiseo.fhdtech.com",
          },
          mainEntityOfPage: "https://aiseo.fhdtech.com/guide",
          image: "https://aiseo.fhdtech.com/og-image.jpg",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://aiseo.fhdtech.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "AI SEO Guide",
              item: "https://aiseo.fhdtech.com/guide",
            },
          ],
        }),
      },
    ],
  }),
  component: Guide,
});

const CRAWLERS = [
  {
    name: "GPTBot",
    who: "OpenAI / ChatGPT",
    note: "Crawls the web for ChatGPT answers & training.",
  },
  {
    name: "OAI-SearchBot",
    who: "ChatGPT Search",
    note: "Powers ChatGPT's live search & citations.",
  },
  { name: "ClaudeBot", who: "Anthropic / Claude", note: "Feeds Claude's knowledge and citations." },
  { name: "PerplexityBot", who: "Perplexity", note: "Indexes pages for Perplexity answers." },
  {
    name: "Google-Extended",
    who: "Gemini / Google AI",
    note: "Controls use in Gemini & AI Overviews.",
  },
  { name: "Applebot", who: "Apple Intelligence", note: "Powers Siri & Apple AI features." },
];

function Guide() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">AI SEO Guide</p>
        <h1 className="mt-2 text-4xl font-bold">How to rank in AI search</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          AI answer engines like ChatGPT, Gemini, Claude, Perplexity and Google AI Mode are the new
          front page. Here's how to make your AI-generated website discoverable and citable.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card icon={FileCode} title="llms.txt">
            A markdown file at your site root that tells AI models what your site is and where to
            read. It's the robots.txt of the AI era — and most AI-built sites are missing it.
          </Card>
          <Card icon={Search} title="AI crawler access">
            If your robots.txt blocks GPTBot, ClaudeBot or PerplexityBot, you're invisible to AI
            answers. Allow the crawlers you want to be cited by.
          </Card>
          <Card icon={Bot} title="Structured data">
            JSON-LD schema gives models clean, machine-readable entities — your organization,
            products, FAQs and articles — so they cite you accurately.
          </Card>
          <Card icon={Quote} title="Answer-ready content">
            Clear question-style headings, concise answers and semantic HTML make your content easy
            to quote in AI responses.
          </Card>
        </div>

        <h2 className="mt-16 text-2xl font-bold">The AI crawlers that matter</h2>
        <div className="mt-6 space-y-3">
          {CRAWLERS.map((c) => (
            <div
              key={c.name}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-card/50 p-5"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.note}</p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {c.who}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card/60 p-8 text-center">
          <h2 className="text-2xl font-bold">Check your AI search readiness</h2>
          <p className="mt-2 text-muted-foreground">
            Run a free scan to see your llms.txt, crawler access and schema status.
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <ScanForm />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

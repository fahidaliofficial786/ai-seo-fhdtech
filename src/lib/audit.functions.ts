import { createServerFn } from "@tanstack/react-start";
import type {
  AuditCheck,
  AuditCategory,
  AuditResult,
  CheckStatus,
  DetectedPlatform,
} from "./audit-types";

function normalizeUrl(input: string): string {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u;
}

async function safeFetch(url: string, ms = 12000): Promise<Response | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FHDTechAISEOBot/1.0; +https://aiseo.fhdtech.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(t);
    return res;
  } catch {
    return null;
  }
}

function count(re: RegExp, s: string): number {
  return (s.match(re) || []).length;
}

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(name + `\\s*=\\s*["']([^"']*)["']`, "i"));
  return m?.[1];
}

function scoreFromChecks(checks: AuditCheck[]): number {
  const scored = checks.filter((c) => c.status !== "info");
  if (!scored.length) return 100;
  const val = (s: CheckStatus) => (s === "pass" ? 1 : s === "warn" ? 0.5 : 0);
  const total = scored.reduce((a, c) => a + val(c.status), 0);
  return Math.round((total / scored.length) * 100);
}

function grade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 55) return "D";
  return "F";
}

const PLATFORM_SIGNALS: { name: string; test: RegExp }[] = [
  { name: "Lovable", test: /gpteng\.co|lovable|data-lovable/i },
  { name: "Bolt.new", test: /bolt\.new|stackblitz/i },
  { name: "V0", test: /v0\.dev|vercel\.com\/v0/i },
  { name: "Replit", test: /replit|repl\.co/i },
  { name: "Firebase Studio", test: /firebase|firebaseapp|web\.app/i },
  { name: "Next.js", test: /__next|_next\/static|next\/script/i },
  { name: "Nuxt", test: /__nuxt|_nuxt\//i },
  { name: "Astro", test: /astro-island|data-astro/i },
  { name: "Remix", test: /__remixContext|remix/i },
  { name: "SvelteKit", test: /svelte-|__sveltekit/i },
  { name: "React", test: /react|data-reactroot|__react/i },
  { name: "WordPress", test: /wp-content|wp-includes|wordpress/i },
  { name: "Shopify", test: /cdn\.shopify|myshopify|shopify/i },
  { name: "Vercel", test: /vercel|_vercel/i },
  { name: "Netlify", test: /netlify/i },
  { name: "Cloudflare Pages", test: /cloudflare|cf-pages|pages\.dev/i },
];

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Amazonbot",
  "Applebot",
  "Bingbot",
  "OAI-SearchBot",
  "anthropic-ai",
];

export const auditWebsite = createServerFn({ method: "POST" })
  .inputValidator((data: { url: string; keyword?: string }) => {
    if (!data?.url || typeof data.url !== "string") throw new Error("URL required");
    return {
      url: data.url.slice(0, 2048),
      keyword: data.keyword ? String(data.keyword).slice(0, 100) : undefined,
    };
  })
  .handler(async ({ data }): Promise<AuditResult> => {
    const url = normalizeUrl(data.url);
    const started = Date.now();
    const res = await safeFetch(url);
    const responseMs = Date.now() - started;

    const base: AuditResult["meta"] = {
      h1Count: 0,
      wordCount: 0,
      imgCount: 0,
      imgMissingAlt: 0,
      internalLinks: 0,
      externalLinks: 0,
      schemaTypes: [],
      ogTags: 0,
      twitterTags: 0,
      https: url.startsWith("https://"),
      hasRobots: false,
      hasSitemap: false,
      hasLlmsTxt: false,
    };

    if (!res) {
      return {
        url,
        finalUrl: url,
        fetchedAt: new Date().toISOString(),
        ok: false,
        error: "The site could not be reached (timeout, DNS or connection error).",
        httpStatus: 0,
        responseMs,
        overallScore: 0,
        grade: "F",
        platforms: [],
        aiCrawlers: AI_CRAWLERS.map((n) => ({ name: n, allowed: true })),
        meta: base,
        categories: [],
        summary: { critical: 1, warnings: 0, passed: 0, total: 1 },
        estimates: { trafficUplift: "—", aiVisibilityUplift: "—", fixTime: "—" },
      };
    }

    const html = await res.text().catch(() => "");
    const finalUrl = res.url || url;
    let origin = url;
    try {
      origin = new URL(finalUrl).origin;
    } catch {
      // Fallback to url
    }

    // Side resources
    const [robotsRes, sitemapRes, llmsRes] = await Promise.all([
      safeFetch(origin + "/robots.txt", 6000),
      safeFetch(origin + "/sitemap.xml", 6000),
      safeFetch(origin + "/llms.txt", 6000),
    ]);
    const robotsTxt = robotsRes && robotsRes.ok ? await robotsRes.text().catch(() => "") : "";
    base.hasRobots = !!(robotsRes && robotsRes.ok);
    base.hasSitemap = !!(sitemapRes && sitemapRes.ok);
    base.hasLlmsTxt = !!(llmsRes && llmsRes.ok);

    const head = (html.match(/<head[\s\S]*?<\/head>/i) || [""])[0];
    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
    const metaDesc = (() => {
      const m = head.match(/<meta[^>]+name=["']description["'][^>]*>/i);
      return m ? attr(m[0], "content") : undefined;
    })();
    const canonical = /<link[^>]+rel=["']canonical["']/i.test(head);
    const viewport = /<meta[^>]+name=["']viewport["']/i.test(head);
    const noindex = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(head);
    const charset = /<meta[^>]+charset/i.test(head);
    const lang = /<html[^>]+lang=/i.test(html);
    const hreflang = count(/<link[^>]+hreflang=/gi, head);
    const favicon = /<link[^>]+rel=["'][^"']*icon/i.test(head);

    base.title = title;
    base.description = metaDesc;
    base.h1Count = count(/<h1[\s>]/gi, html);
    base.wordCount = bodyText ? bodyText.split(" ").length : 0;
    base.imgCount = count(/<img[\s>]/gi, html);
    const imgs = html.match(/<img[^>]*>/gi) || [];
    base.imgMissingAlt = imgs.filter((t) => !/alt\s*=\s*["'][^"']+["']/i.test(t)).length;

    const links = html.match(/<a[^>]+href=["'][^"']*["']/gi) || [];
    for (const l of links) {
      const href = attr(l, "href") || "";
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (/^https?:\/\//i.test(href) && !href.includes(new URL(origin).host)) base.externalLinks++;
      else base.internalLinks++;
    }

    // Schema
    const ldBlocks =
      html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) || [];
    const schemaTypes = new Set<string>();
    for (const b of ldBlocks) {
      const types = b.match(/"@type"\s*:\s*"([^"]+)"/gi) || [];
      for (const t of types) {
        const m = t.match(/"@type"\s*:\s*"([^"]+)"/i);
        if (m) schemaTypes.add(m[1]);
      }
    }
    base.schemaTypes = [...schemaTypes];

    base.ogTags = count(/<meta[^>]+property=["']og:/gi, head);
    base.twitterTags = count(/<meta[^>]+name=["']twitter:/gi, head);

    // Extract Headings Outline
    const headings: { tag: string; text: string }[] = [];
    const headingRe = /<(h[1-6])[\s>][\s\S]*?>([\s\S]*?)<\/h[1-6]>/gi;
    let hMatch;
    while ((hMatch = headingRe.exec(html)) !== null) {
      const tag = hMatch[1].toLowerCase();
      const text = hMatch[2]
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (text) {
        headings.push({ tag, text: text.slice(0, 150) });
      }
    }

    // Extract Images alt status
    const images: { src: string; alt: string; hasAlt: boolean }[] = [];
    const imgRe = /<img([^>]+)>/gi;
    let imgMatch;
    while ((imgMatch = imgRe.exec(html)) !== null) {
      const attrs = imgMatch[1];
      const src = attr("<img " + attrs + ">", "src") || "";
      const alt = attr("<img " + attrs + ">", "alt") || "";
      const hasAlt =
        /alt\s*=\s*["'][^"']*["']/i.test("<img " + attrs + ">") && alt.trim().length > 0;
      if (src) {
        images.push({ src, alt, hasAlt });
      }
    }

    // Extract Links details
    const extractedLinks: { href: string; text: string; isExternal: boolean }[] = [];
    const linkRe = /<a([^>]+)>([\s\S]*?)<\/a>/gi;
    let linkMatch;
    while ((linkMatch = linkRe.exec(html)) !== null) {
      const attrs = linkMatch[1];
      const href = attr("<a " + attrs + ">", "href") || "";
      const text = linkMatch[2]
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        !href.startsWith("javascript:")
      ) {
        let isExternal = false;
        try {
          isExternal = /^https?:\/\//i.test(href) && !href.includes(new URL(origin).host);
        } catch {
          // ignore
        }
        extractedLinks.push({ href, text: text.slice(0, 100) || href, isExternal });
      }
    }

    // Target Keyword Analysis
    let keywordAnalysis: AuditResult["keywordAnalysis"] = undefined;
    if (data.keyword) {
      const kw = data.keyword.trim().toLowerCase();
      const titleLower = title.toLowerCase();
      const metaLower = (metaDesc || "").toLowerCase();
      const bodyLower = bodyText.toLowerCase();
      const inTitle = titleLower.includes(kw);
      const inDescription = metaLower.includes(kw);

      const firstH1Text = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "")
        .replace(/<[^>]*>/g, "")
        .toLowerCase();
      const inH1 = firstH1Text.includes(kw);

      const kwEscaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const kwRegex = new RegExp(`\\b${kwEscaped}\\b`, "gi");
      const kwCount = (bodyLower.match(kwRegex) || []).length;
      const words = base.wordCount || 1;
      const density = Number(((kwCount / words) * 100).toFixed(2));

      keywordAnalysis = {
        keyword: data.keyword,
        density,
        count: kwCount,
        inTitle,
        inDescription,
        inH1,
      };
    }

    // Platform detection
    const platforms: DetectedPlatform[] = [];
    for (const p of PLATFORM_SIGNALS) {
      if (p.test.test(html)) {
        platforms.push({
          name: p.name,
          confidence: "medium",
          signal: "Fingerprint found in page source",
        });
      }
    }

    // AI crawler permissions from robots.txt
    const aiCrawlers = AI_CRAWLERS.map((name) => {
      const re = new RegExp(`User-agent:\\s*${name}[\\s\\S]*?Disallow:\\s*/\\s`, "i");
      const blocked = robotsTxt ? re.test(robotsTxt + "\n") : false;
      return { name, allowed: !blocked };
    });

    const s = (status: CheckStatus): CheckStatus => status;
    const cat = (
      id: string,
      name: string,
      weight: number,
      checks: AuditCheck[],
    ): AuditCategory => ({ id, name, weight, checks, score: scoreFromChecks(checks) });

    const categories: AuditCategory[] = [];

    // On-Page SEO
    categories.push(
      cat("onpage", "On-Page SEO", 1.4, [
        {
          id: "title",
          label: "Page title",
          status: s(title ? (title.length >= 15 && title.length <= 65 ? "pass" : "warn") : "fail"),
          detail: title ? `${title.length} chars: "${title.slice(0, 70)}"` : "No <title> found",
          why: "The title tag is the single strongest on-page ranking signal and the clickable headline in search & AI answers.",
          fix: "Write a unique 50–60 character title with your primary keyword near the front.",
          impact: "critical",
        },
        {
          id: "desc",
          label: "Meta description",
          status: s(
            metaDesc ? (metaDesc.length >= 70 && metaDesc.length <= 165 ? "pass" : "warn") : "fail",
          ),
          detail: metaDesc ? `${metaDesc.length} chars` : "Missing meta description",
          why: "Descriptions drive click-through rate and are frequently reused as AI answer snippets.",
          fix: "Add a compelling 140–160 character description summarising the page.",
          impact: "high",
        },
        {
          id: "h1",
          label: "H1 heading",
          status: s(base.h1Count === 1 ? "pass" : base.h1Count === 0 ? "fail" : "warn"),
          detail: `${base.h1Count} H1 tag(s) found`,
          why: "Exactly one H1 gives crawlers and LLMs a clear topical anchor for the page.",
          fix: base.h1Count === 0 ? "Add one descriptive H1." : "Consolidate to a single H1.",
          impact: "high",
        },
        {
          id: "wordcount",
          label: "Content depth",
          status: s(base.wordCount >= 600 ? "pass" : base.wordCount >= 250 ? "warn" : "fail"),
          detail: `${base.wordCount} words of visible text`,
          why: "Thin content ranks poorly and gives AI models little to cite.",
          fix: "Expand key pages to 600+ words of original, useful content.",
          impact: "medium",
        },
        {
          id: "canonical",
          label: "Canonical tag",
          status: s(canonical ? "pass" : "warn"),
          detail: canonical ? "Canonical link present" : "No canonical tag",
          why: "Canonicals prevent duplicate-content dilution across URL variants.",
          fix: 'Add a self-referencing <link rel="canonical"> to every page.',
          impact: "medium",
        },
        {
          id: "lang",
          label: "HTML lang attribute",
          status: s(lang ? "pass" : "warn"),
          detail: lang ? "lang set on <html>" : "Missing lang attribute",
          why: "Declares language for search engines, translators and screen readers.",
          fix: 'Add lang="en" (or your locale) to the <html> element.',
          impact: "low",
        },
      ]),
    );

    // Technical SEO
    categories.push(
      cat("technical", "Technical SEO", 1.3, [
        {
          id: "https",
          label: "HTTPS",
          status: s(base.https ? "pass" : "fail"),
          detail: base.https ? "Served over HTTPS" : "Not served over HTTPS",
          why: "HTTPS is a confirmed ranking factor and required for user trust.",
          fix: "Enable TLS and force HTTP→HTTPS redirects.",
          impact: "critical",
        },
        {
          id: "status",
          label: "HTTP status",
          status: s(res.status >= 200 && res.status < 300 ? "pass" : "fail"),
          detail: `Returned ${res.status}`,
          why: "Pages must return 200 to be indexed.",
          impact: "critical",
        },
        {
          id: "robots",
          label: "robots.txt",
          status: s(base.hasRobots ? "pass" : "warn"),
          detail: base.hasRobots ? "robots.txt found" : "No robots.txt",
          why: "Guides crawlers and points to your sitemap.",
          fix: "Add a robots.txt with a Sitemap: directive.",
          impact: "medium",
        },
        {
          id: "sitemap",
          label: "XML sitemap",
          status: s(base.hasSitemap ? "pass" : "warn"),
          detail: base.hasSitemap ? "sitemap.xml found" : "No sitemap.xml",
          why: "Sitemaps accelerate discovery and indexing of all pages.",
          fix: "Generate /sitemap.xml and submit it in Search Console.",
          impact: "high",
        },
        {
          id: "noindex",
          label: "Indexability",
          status: s(noindex ? "fail" : "pass"),
          detail: noindex ? "Page is set to noindex!" : "Page is indexable",
          why: "A stray noindex removes the page from Google entirely.",
          fix: "Remove the noindex meta/header on pages you want ranked.",
          impact: "critical",
        },
        {
          id: "charset",
          label: "Charset declared",
          status: s(charset ? "pass" : "warn"),
          detail: charset ? "charset present" : "No charset meta",
          impact: "low",
        },
        {
          id: "hreflang",
          label: "Hreflang",
          status: s(hreflang > 0 ? "pass" : "info"),
          detail:
            hreflang > 0
              ? `${hreflang} hreflang tags`
              : "No hreflang (fine for single-region sites)",
          impact: "low",
        },
      ]),
    );

    // AI / LLM SEO
    categories.push(
      cat("aiseo", "AI & LLM SEO", 1.4, [
        {
          id: "llmstxt",
          label: "llms.txt",
          status: s(base.hasLlmsTxt ? "pass" : "fail"),
          detail: base.hasLlmsTxt ? "/llms.txt found" : "No /llms.txt",
          why: "llms.txt tells ChatGPT, Claude, Perplexity & Gemini what your site is and where to read.",
          fix: "Add a /llms.txt describing your site with links to key pages.",
          impact: "high",
        },
        {
          id: "aicrawl",
          label: "AI crawler access",
          status: s(aiCrawlers.every((c) => c.allowed) ? "pass" : "warn"),
          detail:
            aiCrawlers
              .filter((c) => !c.allowed)
              .map((c) => c.name)
              .join(", ") || "All major AI crawlers allowed",
          why: "Blocking GPTBot/ClaudeBot/PerplexityBot removes you from AI answers & citations.",
          fix: "Allow AI user-agents in robots.txt unless you intentionally opt out.",
          impact: "high",
        },
        {
          id: "schema-ai",
          label: "Structured data for AI",
          status: s(base.schemaTypes.length ? "pass" : "fail"),
          detail: base.schemaTypes.length ? base.schemaTypes.join(", ") : "No JSON-LD schema found",
          why: "Schema gives LLMs machine-readable entities to cite accurately.",
          fix: "Add Organization, WebSite and page-type JSON-LD schema.",
          impact: "high",
        },
        {
          id: "semantic",
          label: "Semantic HTML",
          status: s(/<(article|section|main|nav|header|footer)[\s>]/i.test(html) ? "pass" : "warn"),
          detail: /<main[\s>]/i.test(html)
            ? "Semantic landmarks present"
            : "Few semantic landmarks",
          why: "Semantic structure helps AI parse context blocks and answer snippets.",
          fix: "Use <main>, <article>, <section> and heading hierarchy.",
          impact: "medium",
        },
        {
          id: "answerable",
          label: "Answer-ready content",
          status: s(base.wordCount >= 400 && count(/<h2[\s>]/gi, html) >= 2 ? "pass" : "warn"),
          detail: `${count(/<h2[\s>]/gi, html)} H2 sections`,
          why: "Clear question-style headings make content quotable by AI search.",
          fix: "Structure content with descriptive H2/H3 question headings.",
          impact: "medium",
        },
        {
          id: "faq-schema",
          label: "FAQ / Q&A schema",
          status: s(
            base.schemaTypes.some((t) => /faq|qapage|howto|question/i.test(t)) ? "pass" : "warn",
          ),
          detail: base.schemaTypes.some((t) => /faq|qapage|howto/i.test(t))
            ? "FAQ/HowTo schema present"
            : "No FAQ/HowTo schema",
          why: "FAQ and HowTo schema are among the most-cited formats in AI answers and rich results.",
          fix: "Add FAQPage or HowTo JSON-LD to relevant pages.",
          impact: "medium",
        },
        {
          id: "ai-title-clarity",
          label: "Entity clarity in title",
          status: s(
            title && /[a-z]/i.test(title) && title.split(/\s+/).length >= 3 ? "pass" : "warn",
          ),
          detail: title ? "Title describes a clear entity" : "Title too short or missing",
          why: "AI models extract the primary entity from the title; vague titles reduce citation accuracy.",
          fix: "Name the brand and topic explicitly in the title.",
          impact: "medium",
        },
      ]),
    );

    // Performance
    categories.push(
      cat("performance", "Performance", 1.2, [
        {
          id: "ttfb",
          label: "Server response (TTFB proxy)",
          status: s(responseMs < 600 ? "pass" : responseMs < 1500 ? "warn" : "fail"),
          detail: `${responseMs}ms to first byte`,
          why: "Slow TTFB drags down LCP and Core Web Vitals.",
          fix: "Use edge/SSG rendering, caching and a CDN.",
          impact: "high",
        },
        {
          id: "htmlsize",
          label: "HTML payload",
          status: s(html.length < 150000 ? "pass" : html.length < 400000 ? "warn" : "fail"),
          detail: `${(html.length / 1024).toFixed(0)} KB of HTML`,
          why: "Large HTML slows parsing and rendering.",
          fix: "Split code, defer non-critical markup and lazy-load below the fold.",
          impact: "medium",
        },
        {
          id: "render-block",
          label: "Render-blocking resources",
          status: s(count(/<link[^>]+stylesheet/gi, head) <= 4 ? "pass" : "warn"),
          detail: `${count(/<link[^>]+stylesheet/gi, head)} stylesheet(s) in head`,
          why: "Too many blocking styles delay first paint.",
          fix: "Inline critical CSS and defer the rest.",
          impact: "medium",
        },
        {
          id: "lazy",
          label: "Image lazy-loading",
          status: s(base.imgCount === 0 || /loading=["']lazy["']/i.test(html) ? "pass" : "warn"),
          detail: /loading=["']lazy["']/i.test(html)
            ? "Lazy loading used"
            : "No lazy-loaded images",
          fix: 'Add loading="lazy" to below-the-fold images.',
          impact: "low",
        },
        {
          id: "viewport",
          label: "Viewport meta",
          status: s(viewport ? "pass" : "fail"),
          detail: viewport ? "Responsive viewport set" : "Missing viewport meta",
          why: "Required for mobile rendering and mobile-first indexing.",
          impact: "high",
        },
      ]),
    );

    // Image SEO
    categories.push(
      cat("images", "Image SEO", 0.8, [
        {
          id: "alt",
          label: "Image ALT text",
          status: s(
            base.imgCount === 0
              ? "info"
              : base.imgMissingAlt === 0
                ? "pass"
                : base.imgMissingAlt <= 2
                  ? "warn"
                  : "fail",
          ),
          detail:
            base.imgCount === 0
              ? "No images on page"
              : `${base.imgMissingAlt}/${base.imgCount} images missing alt`,
          why: "ALT text drives image search and accessibility.",
          fix: "Add descriptive alt text to every meaningful image.",
          impact: "medium",
        },
        {
          id: "modern-format",
          label: "Modern image formats",
          status: s(/\.(webp|avif)/i.test(html) ? "pass" : base.imgCount ? "warn" : "info"),
          detail: /\.(webp|avif)/i.test(html) ? "WebP/AVIF in use" : "No modern formats detected",
          fix: "Serve WebP/AVIF for smaller, faster images.",
          impact: "low",
        },
      ]),
    );

    // Social
    categories.push(
      cat("social", "Social & Sharing", 0.7, [
        {
          id: "og",
          label: "Open Graph tags",
          status: s(base.ogTags >= 3 ? "pass" : base.ogTags > 0 ? "warn" : "fail"),
          detail: `${base.ogTags} og: tags`,
          why: "Open Graph controls how links look on Facebook, LinkedIn, WhatsApp, Slack & Discord.",
          fix: "Add og:title, og:description, og:image and og:type.",
          impact: "medium",
        },
        {
          id: "ogimage",
          label: "og:image preview",
          status: s(/<meta[^>]+property=["']og:image/i.test(head) ? "pass" : "warn"),
          detail: /<meta[^>]+property=["']og:image/i.test(head)
            ? "Social preview image set"
            : "No og:image",
          why: "A preview image dramatically raises click-through on shared links.",
          fix: "Add an og:image (1200×630) absolute URL.",
          impact: "medium",
        },
        {
          id: "twitter",
          label: "Twitter/X cards",
          status: s(base.twitterTags >= 2 ? "pass" : base.twitterTags > 0 ? "warn" : "warn"),
          detail: `${base.twitterTags} twitter: tags`,
          fix: "Add twitter:card, twitter:title and twitter:image.",
          impact: "low",
        },
      ]),
    );

    // Content & Authority (E-E-A-T)
    const hasDates = /datePublished|dateModified|<time[\s>]/i.test(html);
    const hasAuthor = /rel=["']author|["']author["']|by\s+[A-Z]/i.test(html);
    const hasBreadcrumb = base.schemaTypes.some((t) => /breadcrumb/i.test(t));
    const h1BeforeH2 = (() => {
      const i1 = html.search(/<h1[\s>]/i);
      const i2 = html.search(/<h2[\s>]/i);
      return i1 === -1 ? false : i2 === -1 ? true : i1 < i2;
    })();
    categories.push(
      cat("authority", "Content & Authority (E-E-A-T)", 1.0, [
        {
          id: "freshness",
          label: "Content freshness signals",
          status: s(hasDates ? "pass" : "warn"),
          detail: hasDates ? "Published/modified dates found" : "No date signals",
          why: "Search engines and AI models favour content with clear, recent dates.",
          fix: "Expose datePublished/dateModified via schema or visible dates.",
          impact: "medium",
        },
        {
          id: "author",
          label: "Author / authorship",
          status: s(hasAuthor ? "pass" : "warn"),
          detail: hasAuthor ? "Authorship signal found" : "No author signal",
          why: "Expertise and authorship are core E-E-A-T trust signals.",
          fix: "Add author names, bios and Person/Organization schema.",
          impact: "medium",
        },
        {
          id: "breadcrumb",
          label: "Breadcrumb schema",
          status: s(hasBreadcrumb ? "pass" : "info"),
          detail: hasBreadcrumb ? "BreadcrumbList present" : "No breadcrumb schema",
          why: "Breadcrumbs clarify site structure for crawlers and AI.",
          fix: "Add BreadcrumbList JSON-LD on deep pages.",
          impact: "low",
        },
        {
          id: "heading-order",
          label: "Heading hierarchy",
          status: s(h1BeforeH2 ? "pass" : "warn"),
          detail: h1BeforeH2 ? "Logical H1 → H2 order" : "Heading order looks inverted",
          why: "A clean heading outline helps AI extract structured answers.",
          fix: "Ensure one H1 followed by ordered H2/H3 sections.",
          impact: "low",
        },
        {
          id: "internal-linking",
          label: "Internal linking",
          status: s(base.internalLinks >= 5 ? "pass" : base.internalLinks >= 2 ? "warn" : "fail"),
          detail: `${base.internalLinks} internal links`,
          why: "Internal links spread authority and help crawlers discover pages.",
          fix: "Add contextual internal links between related pages.",
          impact: "medium",
        },
      ]),
    );

    // Security
    const h = res.headers;
    const hsts = !!h.get("strict-transport-security");
    const csp = !!h.get("content-security-policy");
    const xcto = (h.get("x-content-type-options") || "").toLowerCase().includes("nosniff");
    const xfo = !!h.get("x-frame-options") || csp;
    const refpol = !!h.get("referrer-policy");
    const mixed =
      base.https && /<(img|script|link|iframe)[^>]+(src|href)=["']http:\/\//i.test(html);
    categories.push(
      cat("security", "Security", 1.0, [
        {
          id: "hsts",
          label: "HSTS header",
          status: s(hsts ? "pass" : "warn"),
          detail: hsts ? "Strict-Transport-Security set" : "No HSTS header",
          fix: "Send Strict-Transport-Security with a long max-age.",
          impact: "medium",
        },
        {
          id: "csp",
          label: "Content-Security-Policy",
          status: s(csp ? "pass" : "warn"),
          detail: csp ? "CSP present" : "No CSP header",
          fix: "Add a Content-Security-Policy to mitigate XSS.",
          impact: "medium",
        },
        {
          id: "xcto",
          label: "X-Content-Type-Options",
          status: s(xcto ? "pass" : "warn"),
          detail: xcto ? "nosniff set" : "Missing nosniff",
          impact: "low",
        },
        {
          id: "xfo",
          label: "Clickjacking protection",
          status: s(xfo ? "pass" : "warn"),
          detail: xfo ? "Frame protection present" : "No X-Frame-Options/CSP frame-ancestors",
          impact: "medium",
        },
        {
          id: "referrer",
          label: "Referrer-Policy",
          status: s(refpol ? "pass" : "info"),
          detail: refpol ? "Referrer-Policy set" : "No Referrer-Policy",
          impact: "low",
        },
        {
          id: "mixed",
          label: "Mixed content",
          status: s(mixed ? "fail" : "pass"),
          detail: mixed ? "Insecure http:// resources on HTTPS page" : "No mixed content",
          fix: "Load all assets over HTTPS.",
          impact: "high",
        },
      ]),
    );

    // Accessibility
    categories.push(
      cat("accessibility", "Accessibility", 0.9, [
        {
          id: "img-alt-a11y",
          label: "Images have alt",
          status: s(base.imgCount === 0 ? "info" : base.imgMissingAlt === 0 ? "pass" : "warn"),
          detail:
            base.imgMissingAlt === 0 ? "All images labelled" : `${base.imgMissingAlt} missing alt`,
          impact: "medium",
        },
        {
          id: "lang-a11y",
          label: "Language declared",
          status: s(lang ? "pass" : "warn"),
          detail: lang ? "lang attribute present" : "Missing lang",
          impact: "medium",
        },
        {
          id: "aria",
          label: "ARIA / landmarks",
          status: s(/aria-|role=/i.test(html) ? "pass" : "warn"),
          detail: /aria-|role=/i.test(html) ? "ARIA attributes present" : "No ARIA attributes",
          fix: "Use ARIA roles/labels for interactive and landmark regions.",
          impact: "low",
        },
        {
          id: "viewport-a11y",
          label: "Zoom not disabled",
          status: s(/user-scalable=no|maximum-scale=1/i.test(head) ? "warn" : "pass"),
          detail: /user-scalable=no/i.test(head) ? "Pinch-zoom disabled" : "Zoom allowed",
          impact: "low",
        },
      ]),
    );

    if (keywordAnalysis) {
      categories.push(
        cat("keyword-opt", `Keyword: "${keywordAnalysis.keyword}"`, 1.2, [
          {
            id: "kw-title",
            label: "Keyword in Page Title",
            status: s(keywordAnalysis.inTitle ? "pass" : "fail"),
            detail: keywordAnalysis.inTitle
              ? "Keyword found in page title"
              : "Keyword not found in title",
            why: "Including your target keyword in the title is the most important on-page SEO signal.",
            fix: `Add "${keywordAnalysis.keyword}" near the beginning of your page title.`,
            impact: "critical",
          },
          {
            id: "kw-desc",
            label: "Keyword in Meta Description",
            status: s(keywordAnalysis.inDescription ? "pass" : "fail"),
            detail: keywordAnalysis.inDescription
              ? "Keyword found in description"
              : "Keyword not found in description",
            why: "Having the keyword in the meta description highlights it in search snippets and improves CTR.",
            fix: `Include your target keyword "${keywordAnalysis.keyword}" in the meta description.`,
            impact: "high",
          },
          {
            id: "kw-h1",
            label: "Keyword in H1 Tag",
            status: s(keywordAnalysis.inH1 ? "pass" : "fail"),
            detail: keywordAnalysis.inH1
              ? "Keyword found in H1 heading"
              : "Keyword not found in H1",
            why: "The H1 tag tells users and search engines what the page is about. It should feature the target keyword.",
            fix: `Add your target keyword "${keywordAnalysis.keyword}" to your main H1 tag.`,
            impact: "high",
          },
          {
            id: "kw-density",
            label: "Keyword Density",
            status: s(
              keywordAnalysis.density >= 0.5 && keywordAnalysis.density <= 2.5
                ? "pass"
                : keywordAnalysis.count === 0
                  ? "fail"
                  : "warn",
            ),
            detail: `${keywordAnalysis.count} match(es) (${keywordAnalysis.density}% density)`,
            why: "A density between 0.5% and 2.5% is ideal. Too low means search engines may not index it for this keyword; too high looks like keyword stuffing.",
            fix:
              keywordAnalysis.count === 0
                ? `Integrate your keyword "${keywordAnalysis.keyword}" naturally in the page content.`
                : keywordAnalysis.density > 2.5
                  ? "Reduce occurrences of the keyword to avoid search penalties."
                  : "No change needed.",
            impact: "medium",
          },
        ]),
      );
    }

    // Aggregate
    const allChecks = categories.flatMap((c) => c.checks);
    const critical = allChecks.filter((c) => c.status === "fail").length;
    const warnings = allChecks.filter((c) => c.status === "warn").length;
    const passed = allChecks.filter((c) => c.status === "pass").length;

    const totalWeight = categories.reduce((a, c) => a + c.weight, 0);
    const overallScore = Math.round(
      categories.reduce((a, c) => a + c.score * c.weight, 0) / totalWeight,
    );

    return {
      url,
      finalUrl,
      fetchedAt: new Date().toISOString(),
      ok: true,
      httpStatus: res.status,
      responseMs,
      overallScore,
      grade: grade(overallScore),
      platforms,
      aiCrawlers,
      meta: base,
      categories,
      summary: { critical, warnings, passed, total: allChecks.length },
      estimates: {
        trafficUplift: overallScore >= 90 ? "+5–12%" : overallScore >= 70 ? "+18–35%" : "+40–90%",
        aiVisibilityUplift: base.hasLlmsTxt && base.schemaTypes.length ? "+10–20%" : "+35–70%",
        fixTime: critical > 6 ? "2–4 days" : critical > 2 ? "4–8 hours" : "1–2 hours",
      },
      headings,
      images,
      extractedLinks,
      keywordAnalysis,
    };
  });

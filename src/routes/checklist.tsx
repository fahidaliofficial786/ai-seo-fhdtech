import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Zap } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScanForm } from "@/components/scan-form";
import { Button } from "@/components/ui/button";
import { CHECKLIST } from "@/lib/site-data";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "AI Website SEO Checklist — 100+ Checks | FHDTech" },
      {
        name: "description",
        content:
          "The complete SEO checklist for AI-generated websites: AI/LLM SEO, technical SEO, on-page, schema, Core Web Vitals, security, accessibility and social — grouped by category.",
      },
      { property: "og:title", content: "AI Website SEO Checklist — 100+ Checks" },
      {
        property: "og:description",
        content:
          "Every SEO, AI search, performance, security and accessibility check we run, grouped by category.",
      },
      { property: "og:url", content: "https://aiseo.fhdtech.com/checklist" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/checklist" }],
    scripts: [
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
              name: "SEO Checklist",
              item: "https://aiseo.fhdtech.com/checklist",
            },
          ],
        }),
      },
    ],
  }),
  component: Checklist,
});

const DESCRIPTIONS: Record<string, string> = {
  // AI & LLM SEO
  "llms.txt": "A text file that guides LLM crawlers to key pages, documentation, and context.",
  "ai.txt": "Defines crawler permissions and licensing rules for AI agents and scrapers.",
  "LLM sitemap":
    "Provides specific directories of text-heavy resources optimized for vector processing.",
  "GPTBot access": "Configures robots.txt rules allowing or restricting OpenAI's web crawler.",
  "ClaudeBot access": "Manages access permissions for Anthropic's crawler.",
  "PerplexityBot access": "Handles access permissions for Perplexity's indexing bot.",
  "Google-Extended": "Allows or restricts Google's Gemini training bot from scraping content.",
  "Citation readiness":
    "Structured markup that makes it easy for AI models to attribute and cite your site.",
  "Entity optimization":
    "Ensures nouns, names, and organizations are clearly defined for LLM graphs.",
  "Answer snippets": "Formatting content in Q&A or direct definition styles to win LLM citations.",
  "Semantic HTML": "Using appropriate tag hierarchies so bots understand content context.",
  "Question detection": "Optimizing headings matching queries typed into LLMs or search engines.",
  // Technical SEO
  "robots.txt": "Instructions for search engine crawlers outlining which pages to visit.",
  "XML sitemap": "An index of all key pages to ensure complete indexing by search engines.",
  "Sitemap index": "A list of sitemaps to help search engines parse large website structures.",
  "Crawl depth": "Verifying that important pages are reachable within 3 clicks from home.",
  "Canonical tags": "Prevents duplicate content issues by specifying the master copy of a page.",
  "Redirect chains": "Avoiding multiple consecutive redirects that slow down crawlers.",
  "HTTP status": "Ensuring pages return clean 200 OK responses to crawlers.",
  "404 / soft 404": "Identifying broken links and false-positive 404 pages.",
  "Duplicate URLs": "Consolidating identical pages that compete for the same keyword ranking.",
  HTTPS: "Encrypting website traffic to protect user privacy and improve rank indicators.",
  "Mixed content": "Fixing insecure HTTP assets served on secure HTTPS pages.",
  "WWW redirect": "Redirecting non-www to www (or vice versa) to prevent double indexing.",
  Indexability: "Ensuring crawlers are physically allowed to index and rank the page.",
  Noindex: "Verifying that development or private pages are hidden from public search.",
  Hreflang: "Targeting the correct language version of pages to visitors in different regions.",
  "Orphan pages": "Finding pages that are not linked from any other page on the site.",
  // On-Page SEO
  "Title length & pixels": "Formatting titles to fit within 50-60 characters or ~600px limits.",
  "Meta description":
    "Writing custom page summaries under 160 characters to optimize CTR in SERPs.",
  "Heading structure": "Maintaining a logical hierarchy from H1 down to H6 headings.",
  "Multiple / missing H1": "Ensuring each page has exactly one primary title tag (H1).",
  "Keyword density": "Maintaining target keywords between 0.5% and 2.5% density.",
  "Keyword stuffing": "Avoiding artificial, repetitive keyword placements that look unnatural.",
  "Content depth": "Writing comprehensive articles that thoroughly cover the topic.",
  "Word count": "Providing sufficient textual content for crawlers to understand relevance.",
  Readability: "Using clear fonts, appropriate line-heights, and clear reading styles.",
  "Internal links":
    "Connecting relevant pages to distribute search authority throughout your site.",
  "Anchor text": "Using descriptive text for links instead of generic Click Here labels.",
  "Broken links": "Locating and fixing hyperlinks that point to non-existent URLs.",
  // Schema & Rich Results
  Organization: "Schema code detailing company name, logo, social profiles, and contact info.",
  Website: "Schema enabling search boxes directly in Google search results.",
  Product: "Product price, availability, and rating details shown in search listings.",
  FAQ: "Interactive drop-down question answers shown directly under search listings.",
  Review: "Star ratings and reviewer snippets displayed in search snippets.",
  Article: "Rich news, blog post, and publishing metadata for news features.",
  LocalBusiness: "Local address, phone, coordinates, and hours for localized search mapping.",
  Breadcrumb: "Navigation hierarchies helping users and engines trace page structures.",
  HowTo: "Step-by-step guides with instructions and images shown in search features.",
  Event: "Listing dates, locations, and ticket availability directly in search listings.",
  VideoObject: "Video descriptions, thumbnails, and play links displayed in video tabs.",
  "JSON-LD validation": "Checking for syntax errors in your website's structured schema code.",
  "Rich result eligibility": "Ensuring markup qualifies for Google's enhanced display features.",
  // Performance & Core Web Vitals
  LCP: "Largest Contentful Paint - Loading speed of the main block (under 2.5s is ideal).",
  CLS: "Cumulative Layout Shift - Layout stability during loading (under 0.1 is ideal).",
  INP: "Interaction to Next Paint - Interface responsiveness to click/tap inputs.",
  TTFB: "Time to First Byte - Speed of server response to browser requests.",
  FCP: "First Contentful Paint - Time until the first layout element renders.",
  "Speed Index": "Visual completeness speed of the page during load.",
  "Total Blocking Time": "Total main-thread block time before user interaction.",
  "Unused JS/CSS": "Deferring non-critical scripts and styling to speed up visual load.",
  "Render blocking": "Eliminating scripts and css files that pause page rendering.",
  Compression: "Compressing resources via Gzip or Brotli to reduce download size.",
  Caching: "Enabling browser cache controls to store static assets locally.",
  Minification: "Removing whitespace from code to shrink file payloads.",
  CDN: "Serving static files from global edge servers near the visitor.",
  "HTTP/2 & HTTP/3": "Using modern web protocols to download assets concurrently.",
  // Security
  SSL: "Checking security certificate validity and expiration date.",
  HSTS: "Enforcing secure HTTPS connections for all browser requests.",
  CSP: "Content Security Policy - Blocking cross-site scripting (XSS) code injections.",
  "XSS protection": "Configuring response headers to block cross-site scripting vectors.",
  Clickjacking: "Preventing attackers from iframe-overlaying interactive elements.",
  "Security headers": "Configuring HTTP headers (Referrer, CSP, Frame) for server defense.",
  "Referrer policy": "Controlling how much referrer path information is shared on outbound links.",
  "Permissions policy": "Restricting access to device camera, microphone, and location modules.",
  "Cookie security": "Marking browser session cookies as Secure and HttpOnly.",
  // Accessibility
  ARIA: "Using proper label attributes so screen-readers understand UI elements.",
  Contrast: "Maintaining sufficient contrast ratio (4.5:1) between text and background.",
  "Keyboard navigation": "Ensuring all interactive buttons are reachable via Tab keys.",
  Labels: "Adding description labels to all form inputs.",
  Forms: "Providing clear validation states and error descriptions.",
  "Alt text": "Describing image visuals for visually-impaired readers and bots.",
  "Zoom enabled": "Allowing mobile viewport scale adjustments for readability.",
  "Accessibility score": "General compliance metrics checking accessibility.",
  // Social & Sharing
  "Open Graph": "Standard metadata format for Facebook, LinkedIn, and general social shares.",
  "Facebook preview": "Checking title, description, and image display on Facebook posts.",
  "Twitter cards": "Ensuring summary card templates trigger when link is tweeted.",
  "LinkedIn preview": "Validating title and layout parameters for LinkedIn updates.",
  "Discord preview": "Checking summary and visual preview embeds inside Discord chats.",
  "Slack preview": "Formatting snippet layouts to highlight key assets in Slack rooms.",
  "WhatsApp preview": "Validating preview description formatting in mobile chat windows.",
  "Telegram preview": "Ensuring telegram bots successfully fetch og:image previews.",
  Pinterest: "Checking Rich Pin eligibility for images and articles.",
  // Content Quality
  "Duplicate content": "Avoiding copied paragraphs that trigger search filters.",
  "Thin content": "Expanding pages that offer minimal reading value.",
  "AI-generated detection": "Ensuring content reads natural and human-authored.",
  "Human readability": "Simplifying content layout for ease of reading.",
  "Author info": "Listing publishing credentials to support E-E-A-T indicators.",
  "Contact page": "Providing contact options to establish credibility.",
  "Privacy policy": "Standard disclosures protecting user privacy.",
  Terms: "Providing Terms of Service documentation.",
  "About page": "Explaining the history and mission behind the website.",
};

function Checklist() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            SEO Checklist
          </p>
          <h1 className="mt-2 text-4xl font-bold">The complete website SEO checklist</h1>
          <p className="mt-3 text-muted-foreground">
            Every check our audit engine runs, grouped by category. Run a free scan to see how your
            site scores against all of them.
          </p>
          <div className="mt-8">
            <ScanForm />
          </div>
        </div>

        {/* Detailed Accordion Drops */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Audit Checks Breakdown</h2>
          <Accordion type="multiple" className="border-t border-border">
            {CHECKLIST.map((g) => (
              <AccordionItem key={g.group} value={g.group}>
                <AccordionTrigger className="text-left text-base font-semibold py-4">
                  <span>
                    {g.group}{" "}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      ({g.items.length} checks)
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {g.items.map((i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-card/25 p-4 flex flex-col justify-start gap-1"
                      >
                        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-chart-3" />
                          <span>{i}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pl-6 leading-relaxed">
                          {DESCRIPTIONS[i] ||
                            "Comprehensive check for layout and quality compliance."}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* AI Copilot Prompt Copy Section */}
        <PromptSection />
      </div>
    </PageShell>
  );
}

function PromptSection() {
  const [copied, setCopied] = useState(false);

  const promptText = `Act as an expert SEO Consultant and Web Developer. I need you to optimize my website's code, structure, and content to meet the following industry-standard SEO, PageSpeed, and Crawler optimization guidelines:

1. AI & LLM SEO:
   - Create and configure a valid 'llms.txt' and 'ai.txt' file at the root to guide LLM crawlers.
   - Optimize headings and paragraphs for direct Q&A style to secure AI citations and Answer Snippets.
   - Harden robots.txt rules to configure permissions for GPTBot, ClaudeBot, and PerplexityBot.
   - Implement clean semantic HTML elements (header, nav, main, section, article, footer) for machine parsing.

2. Technical SEO:
   - Build a correct robots.txt and XML sitemap index.
   - Implement Canonical Tags on all pages to prevent duplicate content indexing.
   - Clean up redirect chains and ensure all links return a clean HTTP 200 OK or appropriate 301 redirects.
   - Enforce HTTPS and eliminate mixed content warnings.

3. On-Page SEO:
   - Craft SEO titles (50-60 characters) and meta descriptions (150-160 characters) containing natural primary keywords.
   - Enforce a strict hierarchical heading outline (one single H1 tag per page, followed by H2, H3).
   - Maintain keyword density between 0.5% and 2.5%, avoiding keyword stuffing.
   - Build a contextual internal linking structure using descriptive anchor texts.

4. Schema & Rich Results:
   - Inject valid JSON-LD structured data (Organization, Website, FAQ, Article, LocalBusiness, and Breadcrumb).
   - Verify structured data syntax and ensure eligibility for Google Rich Results.

5. Performance & Core Web Vitals:
   - Optimize Largest Contentful Paint (LCP < 2.5s) and Cumulative Layout Shift (CLS < 0.1).
   - Defer unused JavaScript/CSS, eliminate render-blocking resources, and leverage browser caching.
   - Enable Brotli/Gzip compression and utilize a Content Delivery Network (CDN).

6. Security & HTTPS:
   - Enforce strong HSTS headers, secure referrer policies, and Content Security Policies (CSP).
   - Harden session cookies by marking them as Secure and HttpOnly.

7. Accessibility & Social:
   - Implement descriptive ALT text on all images for screen-readers and image SEO.
   - Ensure a color contrast ratio of at least 4.5:1 for text overlays.
   - Integrate Open Graph (OG) and Twitter Card tags to ensure premium rendering on Facebook, Twitter, LinkedIn, and messaging platforms.

Please analyze my website structure and provide the precise code snippets, configuration files, and content formatting suggestions to achieve perfect scores on these items.`;

  const copy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary animate-pulse" /> Copilot SEO Prompt for AI Tools
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Copy this master checklist prompt and paste it into ChatGPT, Claude, or Gemini to
            automatically optimize your website code.
          </p>
        </div>
        <Button onClick={copy} className="gap-1.5 shrink-0 self-start sm:self-center">
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-chart-3" /> Copied!
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" /> Copy Prompt
            </>
          )}
        </Button>
      </div>

      <div className="relative rounded-2xl border border-border bg-background/60 p-5 font-mono text-xs overflow-y-auto max-h-[300px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {promptText}
      </div>
    </div>
  );
}

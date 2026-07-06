import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { AlertCircle, AlertOctagon, Scale, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — AI SEO Audit | FHDTech" },
      {
        name: "description",
        content:
          "Disclaimer policy for AI SEO Audit by FHDTech. Understand the educational and informational nature of our automated SEO scanning tool results.",
      },
      { property: "og:title", content: "Disclaimer — AI SEO Audit" },
      { property: "og:url", content: "https://aiseo.fhdtech.com/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/disclaimer" }],
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
              name: "Disclaimer",
              item: "https://aiseo.fhdtech.com/disclaimer",
            },
          ],
        }),
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden border-b border-border bg-card/10 py-16 sm:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -z-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
            Disclaimer
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: July 7, 2026 · Effective Immediately
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="prose prose-invert max-w-none space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <Scale className="h-5 w-5 text-primary" /> 1. Educational & Informational Use Only
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                The information, statistics, and audit grades provided on{" "}
                <strong>aiseo.fhdtech.com</strong> ("Website") by <strong>FHDTech</strong> are for
                general educational and informational purposes only. All calculations and automated
                audit scan suggestions represent algorithmic evaluations and should not be construed
                as professional business, legal, or guaranteed marketing advice.
              </p>
              <p>
                You are solely responsible for verifying any suggestions or modifications before
                applying them to your live production websites.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <AlertOctagon className="h-5 w-5 text-primary" /> 2. Accuracy of Scanned Metrics
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                While we strive to ensure our scans represent accurate metrics, audit reports are
                fetched on a live basis based on public page states. Third-party APIs (such as
                Google PageSpeed Insights) may occasionally return different values, rate limit
                requests, or encounter latency.
              </p>
              <p>
                We do not warrant that our reports will be 100% complete, error-free, or match other
                automated audit platforms.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <ShieldAlert className="h-5 w-5 text-primary" /> 3. No Guarantees of Performance
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                We make no guarantees regarding search engine rankings, traffic increases,
                conversion metrics, or visibility uplifts resulting from implementing checklist
                items. Search engine ranking factors (Google, Bing) and LLM search citations
                (ChatGPT, Claude, Gemini, Perplexity) are governed by external third-party companies
                whose ranking formulas change frequently.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

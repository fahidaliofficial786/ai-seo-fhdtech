import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  ListChecks,
  Wrench,
  Gauge,
  Braces,
  ShieldCheck,
  Accessibility,
  Fingerprint,
  ArrowRight,
  Star,
  CheckCircle2,
  XCircle,
  Bot,
  Zap,
  FileSearch,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScanForm } from "@/components/scan-form";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { Button } from "@/components/ui/button";
import {
  PLATFORMS,
  FEATURES,
  HOW_IT_WORKS,
  TESTIMONIALS,
  FAQS,
  CONTACT,
  STATS,
  BENEFITS,
  PLANS,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ property: "og:url", content: "https://aiseo.fhdtech.com/" }],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AI SEO Audit — FHDTech",
          url: "https://aiseo.fhdtech.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://aiseo.fhdtech.com/report?url={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "AI Website SEO Audit",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://aiseo.fhdtech.com",
          description:
            "Free AI website SEO audit tool that runs 100+ checks across SEO, AI search, performance, security and accessibility for sites built with Lovable, Bolt, V0, Cursor, Replit, Vercel and more.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.slice(0, 5).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  ListChecks,
  Wrench,
  Gauge,
  Braces,
  ShieldCheck,
  Accessibility,
  Fingerprint,
};

function Index() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -z-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            The world's most comprehensive PageSpeed & SEO Audit
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight sm:text-6xl">
            Website <span className="gradient-text">PageSpeed &amp; SEO</span> Audit Scanner
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Scan any website URL in seconds and retrieve real-time Google PageSpeed Insights and SEO
            quality reports.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <ScanForm />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-chart-3" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-chart-3" /> Instant results
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-chart-3" /> Real Google PageSpeed data
            </span>
          </div>
        </div>
      </section>

      {/* Trusted platforms */}
      <section className="border-y border-border bg-card/30 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
            Built for websites made with
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="cursor-default rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {/* Stats */}
      <section className="border-b border-border bg-card/20 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="gradient-text text-4xl font-bold sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead
          eyebrow="Everything in one platform"
          title="Not a checker. A complete audit engine."
          sub="Traditional SEO, technical health, Core Web Vitals, AI search optimization, schema, security & accessibility — analyzed and scored together."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <div
                key={f.title}
                className="card-lift group rounded-2xl border border-border bg-card/50 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="How it works" title="From URL to rankings in four steps" />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {HOW_IT_WORKS.map((h) => (
              <div
                key={h.step}
                className="card-lift group rounded-2xl border border-border bg-background p-6"
              >
                <span className="text-3xl font-bold text-primary/40 transition-colors group-hover:text-primary/70">
                  {h.step}
                </span>
                <h3 className="mt-3 font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI websites fail */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              align="left"
              eyebrow="The AI website problem"
              title="Why AI-generated websites fail at SEO"
              sub="AI builders ship beautiful pages — but skip the signals search engines and AI answers rely on."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Missing or duplicate meta tags",
                "No structured data / schema",
                "No sitemap or robots.txt",
                "Poor internal linking",
                "Broken indexing signals",
                "No AI metadata (llms.txt)",
                "Slow Core Web Vitals",
                "Client-only rendering hides content",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card/50 p-8">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">AI Search Readiness</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We check the exact signals that decide whether ChatGPT, Gemini, Claude &amp;
              Perplexity can find and cite your site.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: "llms.txt present", ok: true },
                { label: "GPTBot / ClaudeBot allowed", ok: true },
                { label: "Structured data for entities", ok: true },
                { label: "Answer-ready content blocks", ok: false },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm"
                >
                  <span>{r.label}</span>
                  {r.ok ? (
                    <CheckCircle2 className="h-5 w-5 text-chart-3" />
                  ) : (
                    <XCircle className="h-5 w-5 text-chart-5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live demo CTA */}
      {/* Benefits */}
      <section className="border-t border-border bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Why it matters"
            title="Turn AI-built sites into traffic machines"
            sub="Every audit is designed around outcomes — not vanity scores."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="card-lift rounded-2xl border border-border bg-background p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo CTA */}
      <section className="border-y border-border bg-gradient-to-b from-primary/10 to-transparent py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FileSearch className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-3xl font-bold">Run a live audit right now</h2>
          <p className="mt-3 text-muted-foreground">
            Paste any website URL and get an instant, detailed report with scores, priority fixes
            and impact estimates.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <ScanForm />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Loved by builders & agencies" title="Success stories" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-lift rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                ))}
              </div>
              <p className="mt-4 text-sm">"{t.quote}"</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Pricing"
            title="Start free. Upgrade when you scale."
            sub="Run unlimited free scans. Move up when you need automation, exports and client-ready reports."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`card-lift relative flex flex-col rounded-3xl border p-8 ${
                  plan.featured
                    ? "border-primary/60 bg-primary/5 shadow-lg"
                    : "border-border bg-background"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="pb-1 text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {plan.featured ? (
                    <a href={CONTACT.calendly} target="_blank" rel="noreferrer">
                      <Button className="w-full">{plan.cta}</Button>
                    </a>
                  ) : (
                    <a href={CONTACT.calendly} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="w-full">
                        {plan.cta}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Zap className="mx-auto h-9 w-9 text-primary" />
          <h2 className="mt-4 text-3xl font-bold">Book a free website SEO consultation</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Pick a 30-minute slot below. We'll review your site's PageSpeed & SEO live and map out
            exactly what to fix first.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-1.5">
                Chat on WhatsApp <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <CalendlyEmbed />
        </div>
      </section>

      {/* Human Review vs Automated Estimate Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-transparent to-primary/5 p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Human Expert Review
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Automated Audits are great. <br />
                <span className="gradient-text">Human Review is definitive.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Automated scanners check standard tags and code structures. However, true SEO
                success requires human evaluation of context, user intent, search intent alignment,
                and actual indexing status.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Manual indexing check on Google Search Console",
                  "Expert review of entity clarity and structured data",
                  "Custom ranking and backlink strategy tailored to your niche",
                  "Verification of AI crawler accessibility and llms.txt alignment",
                ].map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/50 p-6 sm:p-8 flex flex-col justify-center text-center">
              <Bot className="mx-auto h-12 w-12 text-primary animate-pulse" />
              <h3 className="mt-4 text-lg font-bold">Request a Manual Review</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Book a free 30-minute meeting to go through your site's audit results with our
                senior SEO expert and get a manual audit checklist.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full gap-1.5">
                    Book Free Human Review <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="w-full">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <SectionHead eyebrow="FAQ" title="Common questions" />
        <div className="mt-10 space-y-3">
          {FAQS.slice(0, 5).map((f) => (
            <div key={f.q} className="rounded-2xl border border-border bg-card/50 p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/faq">
            <Button variant="outline">View all FAQs</Button>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

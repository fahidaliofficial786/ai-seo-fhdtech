import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Scale, FileSignature, AlertTriangle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — AI SEO Audit | FHDTech" },
      {
        name: "description",
        content:
          "Terms of Service for AI SEO Audit by FHDTech. Read the legal terms governing your use of our automated SEO scanning tools, consultations, and platforms.",
      },
      { property: "og:title", content: "Terms of Service — AI SEO Audit" },
      { property: "og:url", content: "https://aiseo.fhdtech.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/terms" }],
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
              name: "Terms of Service",
              item: "https://aiseo.fhdtech.com/terms",
            },
          ],
        }),
      },
    ],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <PageShell>
      <div className="relative overflow-hidden border-b border-border bg-card/10 py-16 sm:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -z-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
            <Scale className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
            Terms of Service
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
              <FileSignature className="h-5 w-5 text-primary" /> 1. Agreement to Terms
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                By accessing or using our website at <strong>aiseo.fhdtech.com</strong> ("Service"),
                you agree to be bound by these Terms of Service ("Terms") and all applicable laws
                and regulations. If you do not agree with any of these terms, you are prohibited
                from using or accessing this website.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you (individual or
                corporate entity) and <strong>FHDTech</strong>.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" /> 2. Use of Audit Platform
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                We grant you a personal, non-exclusive, non-transferable, revocable license to
                access our automated SEO scanner and checklist reports for evaluation purposes.
                Under this license:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-sm">
                <li>
                  You must represent that you own or possess legal rights to audit the submitted
                  domain URLs.
                </li>
                <li>
                  You may not use the Service to harvest site links or scrapers for malicious
                  database attacks.
                </li>
                <li>
                  You may not attempt to decompile, reverse-engineer, or extract code blocks from
                  our audit engine.
                </li>
                <li>
                  You may not copy or redistribute any part of our platform styling or custom
                  scripts.
                </li>
              </ul>
              <p>
                Violation of any of these restrictions will automatically terminate your permission
                to use the Service.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-primary" /> 3. Limitations & Disclaimers
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                The audit reports and optimization guidelines provided by our platform are served on
                an "as is" and "as available" basis. FHDTech makes no warranties, expressed or
                implied, and hereby disclaims all other warranties including, without limitation,
                implied warranties or conditions of merchantability or fitness for a particular
                purpose.
              </p>
              <p>
                Further, FHDTech does not warrant or make any representations concerning the
                accuracy, likely results, or reliability of using the materials on its website or
                any sites linked to this service.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Governing Law</h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                Any claim relating to FHDTech's Service shall be governed by the laws of Pakistan,
                without regard to its conflict of law provisions. You agree to submit to the
                personal and exclusive jurisdiction of the local courts located within the country.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

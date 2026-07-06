import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Shield, Eye, Lock, RefreshCw, FileText } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AI SEO Audit | FHDTech" },
      {
        name: "description",
        content:
          "Privacy Policy for AI SEO Audit by FHDTech. Understand how we collect, use, protect, and respect your personal data and website audit history under GDPR and CCPA.",
      },
      { property: "og:title", content: "Privacy Policy — AI SEO Audit" },
      { property: "og:url", content: "https://aiseo.fhdtech.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/privacy" }],
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
              name: "Privacy Policy",
              item: "https://aiseo.fhdtech.com/privacy",
            },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <PageShell>
      <div className="relative overflow-hidden border-b border-border bg-card/10 py-16 sm:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -z-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
            Privacy Policy
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
              <Eye className="h-5 w-5 text-primary" /> 1. Introduction
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                Welcome to AI SEO Audit, owned and operated by <strong>FHDTech</strong> ("we",
                "our", or "us"). We are committed to protecting your privacy and ensuring the
                security of your personal data. This Privacy Policy describes how we collect,
                process, use, store, and disclose your information when you visit our website (
                <strong>aiseo.fhdtech.com</strong>) and utilize our search engine optimization audit
                and analysis platforms.
              </p>
              <p>
                By accessing our website or running website scans, you consent to the collection and
                use of information in accordance with this policy. This Privacy Policy is structured
                to comply with global data protection laws including the General Data Protection
                Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <FileText className="h-5 w-5 text-primary" /> 2. Information We Collect
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-4 leading-relaxed text-sm sm:text-base">
              <p>
                We collect several types of information to provide and improve our services to you:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                <div className="rounded-xl border border-border bg-card/30 p-5 space-y-2">
                  <h3 className="font-bold text-foreground">A. Audit Log Information</h3>
                  <p className="text-xs">
                    When you run a scan, we submit queries to fetch public web page tags,
                    robots.txt, sitemaps, headings, PageSpeed Insights metrics, and external
                    resources. We store this URL scan metadata to generate your report.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card/30 p-5 space-y-2">
                  <h3 className="font-bold text-foreground">B. Contact and Form Data</h3>
                  <p className="text-xs">
                    If you book a consultation via our Calendly embed, reach out to us on WhatsApp,
                    or fill out our contact forms, we collect details including your name, email
                    address, website URL, and details of your inquiry.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <Lock className="h-5 w-5 text-primary" /> 3. Data Protection & Security
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                The security of your data is of critical importance to us. We implement
                industry-standard security practices, including end-to-end SSL/TLS encryption for
                all traffic, secure cookie headers, and automated monitoring to protect your
                information against unauthorized access, loss, or alteration.
              </p>
              <p>
                Please remember that no method of transmission over the Internet is 100% secure.
                While we strive to use commercially acceptable means to protect your personal data,
                we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <RefreshCw className="h-5 w-5 text-primary" /> 4. GDPR & CCPA Rights
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                Depending on your jurisdiction (such as the European Economic Area under GDPR or
                California under CCPA), you possess the following rights:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-sm">
                <li>Right to request access to the personal data we hold about you.</li>
                <li>Right to request correction of inaccurate personal data.</li>
                <li>Right to request erasure of your audit histories or personal records.</li>
                <li>Right to object to or restrict processing of your information.</li>
                <li>Right to data portability in structured formats.</li>
              </ul>
              <p className="mt-2 text-xs">
                To exercise any of these rights, please contact our Data Protection Officer at{" "}
                <a href="mailto:hello@fhdtech.com" className="text-primary hover:underline">
                  hello@fhdtech.com
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Contact Information</h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                If you have any questions or complaints about this Privacy Policy, please reach out
                to us at:
              </p>
              <div className="mt-3 rounded-2xl border border-border bg-primary/5 p-5 max-w-sm text-xs space-y-1">
                <p className="font-bold text-foreground">FHDTech Data Protection</p>
                <p>Website: aiseo.fhdtech.com</p>
                <p>
                  Email:{" "}
                  <a href="mailto:hello@fhdtech.com" className="text-primary hover:underline">
                    hello@fhdtech.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

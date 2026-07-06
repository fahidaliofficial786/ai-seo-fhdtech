import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Cookie, Settings, ShieldAlert, CheckSquare } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — AI SEO Audit | FHDTech" },
      {
        name: "description",
        content:
          "Cookie Policy for AI SEO Audit by FHDTech. Learn what cookies are, how we use performance/analytics cookies, and how to manage your cookie choices.",
      },
      { property: "og:title", content: "Cookie Policy — AI SEO Audit" },
      { property: "og:url", content: "https://aiseo.fhdtech.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/cookies" }],
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
              name: "Cookies",
              item: "https://aiseo.fhdtech.com/cookies",
            },
          ],
        }),
      },
    ],
  }),
  component: CookiesPolicy,
});

function CookiesPolicy() {
  return (
    <PageShell>
      <div className="relative overflow-hidden border-b border-border bg-card/10 py-16 sm:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -z-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
            <Cookie className="h-6 w-6 animate-bounce" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
            Cookie Policy
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
              <CheckSquare className="h-5 w-5 text-primary" /> 1. What Are Cookies?
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                Cookies are small text files containing a string of characters that can be placed on
                your computer or mobile device when you visit a website. They uniquely identify your
                browser or device to help the site remember your preference inputs and optimize your
                page experiences.
              </p>
              <p>
                Cookies set by the website owner (in this case, FHDTech) are called "first-party
                cookies". Cookies set by parties other than the website owner are called
                "third-party cookies".
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <Settings className="h-5 w-5 text-primary" /> 2. Types of Cookies We Use
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-4 leading-relaxed text-sm sm:text-base">
              <p>We utilize the following categories of cookies on our website:</p>

              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                <div className="rounded-xl border border-border bg-card/30 p-5 space-y-2">
                  <h3 className="font-bold text-foreground">A. Essential Cookies</h3>
                  <p className="text-xs">
                    These cookies are strictly necessary to deliver services available through our
                    site, such as secure forms, user audits, and page navigation controls. Without
                    these, the site cannot function properly.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card/30 p-5 space-y-2">
                  <h3 className="font-bold text-foreground">B. Analytics & Performance</h3>
                  <p className="text-xs">
                    These cookies collect aggregated information to help us understand how our site
                    is being used, allowing us to optimize page speeds, performance metrics, and fix
                    UI issues.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <ShieldAlert className="h-5 w-5 text-primary" /> 3. Managing Cookie Preferences
            </h2>
            <div className="border-l-2 border-border pl-4 text-muted-foreground space-y-3 leading-relaxed text-sm sm:text-base">
              <p>
                You have the right to decide whether to accept or reject cookies. You can set or
                amend your web browser controls to accept or refuse cookies. If you choose to reject
                cookies, you may still use our website though your access to some features (like
                saved audits or embedded booking calendars) might be restricted.
              </p>
              <p>
                To learn more about how to manage cookies on major web browsers (Chrome, Firefox,
                Safari, Edge), please consult your browser's Help menu or visit the official
                guidelines at{" "}
                <a
                  href="https://www.aboutcookies.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  aboutcookies.org
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

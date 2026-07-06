import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FHDTech — AI Website SEO Experts" },
      {
        name: "description",
        content:
          "FHDTech builds the world's most comprehensive SEO audit platform for AI-generated websites, helping founders and agencies rank in Google and AI search.",
      },
      { property: "og:title", content: "About FHDTech" },
      {
        property: "og:description",
        content: "AI website SEO experts helping AI-built sites get found in Google and AI search.",
      },
      { property: "og:url", content: "https://aiseo.fhdtech.com/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About FHDTech",
          url: "https://aiseo.fhdtech.com/about",
          description:
            "FHDTech builds the world's most comprehensive SEO audit platform for AI-generated websites.",
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
              name: "About",
              item: "https://aiseo.fhdtech.com/about",
            },
          ],
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-2 text-4xl font-bold">Built by FHDTech</h1>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            AI website builders made it possible for anyone to ship a beautiful site in minutes. But
            beautiful doesn't mean discoverable — most AI-generated sites are invisible to Google
            and AI search engines.
          </p>
          <p>
            FHDTech built this platform to close that gap. We combine traditional SEO auditing,
            technical SEO, Core Web Vitals, schema validation, security and accessibility with a
            first-of-its-kind AI search optimization engine — purpose-built for sites made with
            Lovable, Bolt, V0, Cursor, Replit, Vercel and more.
          </p>
          <p>
            Our mission is simple: help founders, indie hackers and agencies turn their AI-built
            websites into traffic-generating, AI-citable assets.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={CONTACT.portfolio} target="_blank" rel="noreferrer">
            <Button variant="outline">View portfolio</Button>
          </a>
          <a href={CONTACT.calendly} target="_blank" rel="noreferrer">
            <Button>Book a free consultation</Button>
          </a>
        </div>

        <div className="mt-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Let's talk</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Book a free strategy session</h2>
          <p className="mt-3 text-muted-foreground">
            Choose a 30-minute slot and we'll walk through your AI-built website's SEO together.
          </p>
          <div className="mt-8">
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Calendar, Mail, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FHDTech — Free AI Website SEO Consultation" },
      {
        name: "description",
        content:
          "Book a free 30-minute AI website SEO strategy session, message us on WhatsApp, or reach out on any social platform.",
      },
      { property: "og:title", content: "Contact FHDTech" },
      {
        property: "og:description",
        content: "Book a free AI website SEO consultation or message us on WhatsApp.",
      },
      { property: "og:url", content: "https://aiseo.fhdtech.com/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact FHDTech",
          url: "https://aiseo.fhdtech.com/contact",
          description:
            "Book a free 30-minute AI website SEO consultation or send FHDTech a message.",
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
              name: "Contact",
              item: "https://aiseo.fhdtech.com/contact",
            },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Contact</p>
        <h1 className="mt-2 text-4xl font-bold">Let's improve your AI website's SEO</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Book a free 30-minute strategy session or send us a message. We usually reply within a few
          hours.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <QuickLink
              icon={Calendar}
              title="Book a free 30-min call"
              sub="Calendly · Free strategy session"
              href={CONTACT.calendly}
            />
            <QuickLink
              icon={MessageCircle}
              title="Chat on WhatsApp"
              sub="Fastest way to reach us"
              href={CONTACT.whatsapp}
            />
            <QuickLink
              icon={ExternalLink}
              title="View our portfolio"
              sub={CONTACT.portfolio}
              href={CONTACT.portfolio}
            />
            <QuickLink
              icon={Mail}
              title="Email us"
              sub={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />

            <div className="rounded-2xl border border-border bg-card/50 p-5">
              <p className="text-sm font-semibold">Follow us</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONTACT.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-16">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Schedule</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Pick a time that works for you</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Prefer to talk it through? Grab a free 30-minute slot below and we'll review your
            AI-built site live.
          </p>
          <div className="mt-8">
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function QuickLink({
  icon: Icon,
  title,
  sub,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-primary/50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        <p className="truncate text-sm text-muted-foreground">{sub}</p>
      </div>
    </a>
  );
}

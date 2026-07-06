import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageShell } from "@/components/page-shell";
import { FAQS } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "AI Website SEO — Frequently Asked Questions | FHDTech" },
      {
        name: "description",
        content:
          "Answers about AI website SEO audits, llms.txt, AI crawlers, supported platforms, Core Web Vitals, reports and consultations.",
      },
      { property: "og:title", content: "AI Website SEO FAQ" },
      {
        property: "og:description",
        content:
          "Everything you need to know about auditing AI-generated websites for SEO and AI search.",
      },
      { property: "og:url", content: "https://aiseo.fhdtech.com/faq" },
    ],
    links: [{ rel: "canonical", href: "https://aiseo.fhdtech.com/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
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
              name: "FAQ",
              item: "https://aiseo.fhdtech.com/faq",
            },
          ],
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">FAQ</p>
        <h1 className="mt-2 text-4xl font-bold">Frequently asked questions</h1>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageShell>
  );
}

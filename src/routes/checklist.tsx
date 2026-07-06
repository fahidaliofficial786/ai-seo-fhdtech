import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ScanForm } from "@/components/scan-form";
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

function Checklist() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">SEO Checklist</p>
        <h1 className="mt-2 text-4xl font-bold">The complete AI website SEO checklist</h1>
        <p className="mt-3 text-muted-foreground">
          Every check our audit engine runs, grouped by category. Run a free scan to see how your
          site scores against all of them.
        </p>
        <div className="mt-8">
          <ScanForm />
        </div>

        <Accordion type="multiple" className="mt-12">
          {CHECKLIST.map((g) => (
            <AccordionItem key={g.group} value={g.group}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {g.group}{" "}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  ({g.items.length})
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {g.items.map((i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-chart-3" /> {i}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageShell>
  );
}

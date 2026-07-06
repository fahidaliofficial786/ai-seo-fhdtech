import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Loader2,
  Gauge,
  TrendingUp,
  Bot,
  Clock,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Zap,
  ListChecks,
  Hash,
  Image,
  Link2,
} from "lucide-react";
import { z } from "zod";
import { PageShell } from "@/components/page-shell";
import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auditWebsite } from "@/lib/audit.functions";
import { generateAiPlan } from "@/lib/ai-plan.functions";
import type { AuditCheck, CheckStatus, AuditResult } from "@/lib/audit-types";

export const Route = createFileRoute("/report")({
  validateSearch: z.object({ url: z.string().optional(), keyword: z.string().optional() }),
  component: Report,
  head: () => ({
    meta: [
      { title: "SEO Audit Report — AI Website SEO | FHDTech" },
      {
        name: "description",
        content:
          "Your live AI website SEO audit report with scores, priority fixes and an AI-generated action plan.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

const STATUS_META: Record<
  CheckStatus,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  pass: { icon: CheckCircle2, color: "text-chart-3" },
  warn: { icon: AlertTriangle, color: "text-chart-4" },
  fail: { icon: XCircle, color: "text-destructive" },
  info: { icon: Info, color: "text-muted-foreground" },
};

function Report() {
  const { url, keyword } = Route.useSearch();
  const runAudit = useServerFn(auditWebsite);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["audit", url, keyword],
    queryFn: () => runAudit({ data: { url: url!, keyword } }),
    enabled: !!url,
    retry: false,
    staleTime: 60_000,
  });

  if (!url) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-4 py-32 text-center">
          <h1 className="text-2xl font-bold">No URL provided</h1>
          <p className="mt-2 text-muted-foreground">Enter a website URL to run an audit.</p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Go to scanner</Button>
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> New scan
        </Link>

        {(isLoading || isFetching) && !data && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <h2 className="mt-6 text-xl font-semibold">Auditing {url}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Running SEO, AI search, performance, security &amp; accessibility checks…
            </p>
          </div>
        )}

        {isError && (
          <div className="mx-auto max-w-md py-32 text-center">
            <XCircle className="mx-auto h-10 w-10 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">Audit failed</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't complete the scan. Please try again.
            </p>
            <Button className="mt-6" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {data && !data.ok && (
          <div className="mx-auto max-w-md py-32 text-center">
            <XCircle className="mx-auto h-10 w-10 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">Could not reach the site</h2>
            <p className="mt-2 text-sm text-muted-foreground">{data.error}</p>
            <Button className="mt-6" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {data && data.ok && (
          <div className="mt-6 space-y-8">
            {/* Overview */}
            <div className="grid gap-6 rounded-3xl border border-border bg-card/50 p-8 md:grid-cols-[auto_1fr]">
              <div className="flex flex-col items-center gap-3">
                <ScoreRing score={data.overallScore} label="Overall" />
                <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                  Grade {data.grade}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold">Audit report</h1>
                  <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => refetch()}>
                    <RefreshCw className="h-3.5 w-3.5" /> Rescan
                  </Button>
                </div>
                <a
                  href={data.finalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {data.finalUrl} <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat label="Passed" value={data.summary.passed} accent="text-chart-3" />
                  <Stat label="Warnings" value={data.summary.warnings} accent="text-chart-4" />
                  <Stat label="Critical" value={data.summary.critical} accent="text-destructive" />
                  <Stat label="Total checks" value={data.summary.total} />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Estimate
                    icon={TrendingUp}
                    label="Traffic uplift"
                    value={data.estimates.trafficUplift}
                  />
                  <Estimate
                    icon={Bot}
                    label="AI visibility"
                    value={data.estimates.aiVisibilityUplift}
                  />
                  <Estimate icon={Clock} label="Est. fix time" value={data.estimates.fixTime} />
                </div>
              </div>
            </div>

            {/* Detection */}
            <div className="grid gap-6 md:grid-cols-2">
              <Panel title="Detected platform / framework">
                {data.platforms.length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.platforms.map((p) => (
                      <span
                        key={p.name}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-sm"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specific AI builder fingerprint detected.
                  </p>
                )}
              </Panel>
              <Panel title="AI crawler access">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {data.aiCrawlers.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      {c.allowed ? (
                        <CheckCircle2 className="h-4 w-4 text-chart-3" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-muted-foreground">{c.name}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            {/* Category scores */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.categories.map((c) => (
                <div key={c.id} className="rounded-2xl border border-border bg-card/50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <Gauge className="h-4 w-4 text-primary" />
                      {c.name}
                    </span>
                    <span className="text-lg font-bold">{c.score}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI action plan */}
            <AiActionPlan data={data} />

            {/* Priority fixes */}
            <PriorityFixes data={data} />

            {/* Diagnostic outline explorers */}
            <DiagnosticExplorers data={data} />

            {/* Detailed checks */}
            <div className="space-y-6">
              {data.categories.map((c) => (
                <div key={c.id} className="rounded-2xl border border-border bg-card/50 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <span className="text-sm text-muted-foreground">{c.score}/100</span>
                  </div>
                  <div className="divide-y divide-border">
                    {c.checks.map((chk) => (
                      <CheckRow key={chk.id} check={chk} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card/60 p-8 text-center">
              <h3 className="text-xl font-bold">Want us to fix these for you?</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
                Book a free 30-minute AI website SEO strategy session and we'll walk through your
                report.
              </p>
              <Link to="/contact" className="mt-5 inline-block">
                <Button>Get help fixing this</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function CheckRow({ check }: { check: AuditCheck }) {
  const M = STATUS_META[check.status];
  const Icon = M.icon;
  return (
    <div className="flex gap-3 py-3">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${M.color}`} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{check.label}</span>
          {check.impact && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              {check.impact}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{check.detail}</p>
        {check.status !== "pass" && check.fix && (
          <p className="mt-1 text-sm">
            <span className="font-medium text-foreground">Fix: </span>
            <span className="text-muted-foreground">{check.fix}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <p className={`text-2xl font-bold ${accent ?? ""}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Estimate({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <p className="text-sm font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <h3 className="mb-3 font-semibold">{title}</h3>
      {children}
    </div>
  );
}

const IMPACT_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

function PriorityFixes({ data }: { data: AuditResult }) {
  const issues = data.categories
    .flatMap((c) => c.checks.map((chk) => ({ ...chk, category: c.name })))
    .filter((c) => c.status === "fail" || c.status === "warn")
    .sort(
      (a, b) =>
        (a.status === "fail" ? 0 : 1) - (b.status === "fail" ? 0 : 1) ||
        (IMPACT_ORDER[a.impact ?? "low"] ?? 3) - (IMPACT_ORDER[b.impact ?? "low"] ?? 3),
    )
    .slice(0, 8);

  if (!issues.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <ListChecks className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Top priority fixes</h3>
      </div>
      <ol className="space-y-3">
        {issues.map((chk, i) => (
          <li key={chk.id} className="flex gap-3 rounded-xl border border-border bg-background p-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{chk.label}</span>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {chk.category}
                </span>
                {chk.impact && (
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-destructive">
                    {chk.impact}
                  </span>
                )}
              </div>
              {chk.fix && <p className="mt-1 text-sm text-muted-foreground">{chk.fix}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const PRIORITY_STYLE: Record<string, string> = {
  critical: "bg-destructive/10 text-destructive",
  high: "bg-chart-4/10 text-chart-4",
  medium: "bg-primary/10 text-primary",
};

function AiActionPlan({ data }: { data: AuditResult }) {
  const runPlan = useServerFn(generateAiPlan);
  const [started, setStarted] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      runPlan({
        data: {
          url: data.finalUrl,
          score: data.overallScore,
          grade: data.grade,
          platforms: data.platforms.map((p) => p.name),
          issues: data.categories.flatMap((c) =>
            c.checks.map((chk) => ({
              label: chk.label,
              status: chk.status,
              impact: chk.impact,
              category: c.name,
            })),
          ),
        },
      }),
  });

  const start = () => {
    setStarted(true);
    mutation.mutate();
  };

  return (
    <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI-powered action plan</h3>
        </div>
        {!started && (
          <Button onClick={start} className="gap-1.5">
            <Zap className="h-4 w-4" /> Generate plan
          </Button>
        )}
        {started && (mutation.isError || (mutation.data && !mutation.data.ok)) && (
          <Button variant="outline" onClick={() => mutation.mutate()}>
            Retry
          </Button>
        )}
      </div>

      {!started && (
        <p className="mt-2 text-sm text-muted-foreground">
          Let our AI read your full report and write a prioritised, plain-English fix plan tailored
          to your site.
        </p>
      )}

      {started && mutation.isPending && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" /> Analysing your report…
        </div>
      )}

      {mutation.data && !mutation.data.ok && (
        <p className="mt-4 text-sm text-destructive">{mutation.data.error}</p>
      )}

      {mutation.data && mutation.data.ok && (
        <div className="mt-4 space-y-4">
          {mutation.data.summary && <p className="text-sm">{mutation.data.summary}</p>}
          <ol className="space-y-3">
            {mutation.data.steps?.map((step, i) => (
              <li key={i} className="rounded-xl border border-border bg-background p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">
                    {i + 1}. {step.title}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${PRIORITY_STYLE[step.priority] ?? PRIORITY_STYLE.medium}`}
                  >
                    {step.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function DiagnosticExplorers({ data }: { data: AuditResult }) {
  return (
    <div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">Crawler Diagnostics &amp; Site Outline</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Explore the exact heading outline, images, and links extracted from the crawled page.
        </p>
      </div>

      <Tabs defaultValue="headings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="headings" className="gap-2">
            <Hash className="h-4 w-4" /> Headings Outline
          </TabsTrigger>
          <TabsTrigger value="images" className="gap-2">
            <Image className="h-4 w-4" /> Images Alt Audit
          </TabsTrigger>
          <TabsTrigger value="links" className="gap-2">
            <Link2 className="h-4 w-4" /> Extracted Links
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="headings"
          className="mt-4 border border-border rounded-2xl bg-background/50 p-6"
        >
          <h4 className="font-semibold text-sm mb-4">Heading Structure Hierarchy</h4>
          {data.headings && data.headings.length > 0 ? (
            <div className="space-y-3 font-mono text-sm max-h-[350px] overflow-y-auto pr-2">
              {data.headings.map((h, index) => {
                const indent =
                  {
                    h1: "pl-0 font-bold text-foreground text-base border-l-2 border-primary pl-2",
                    h2: "pl-4 font-semibold text-muted-foreground/90 border-l border-muted/50 pl-6",
                    h3: "pl-8 text-muted-foreground/80 pl-10",
                    h4: "pl-12 text-muted-foreground/70 text-xs pl-14",
                    h5: "pl-16 text-muted-foreground/60 text-xs pl-18",
                    h6: "pl-20 text-muted-foreground/50 text-xs pl-22",
                  }[h.tag] || "pl-0";

                return (
                  <div
                    key={index}
                    className={`${indent} py-1 transition-colors hover:bg-primary/5 rounded`}
                  >
                    <span className="text-xs uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded mr-2 font-sans font-medium">
                      {h.tag}
                    </span>
                    {h.text}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No headings found on this page.</p>
          )}
        </TabsContent>

        <TabsContent
          value="images"
          className="mt-4 border border-border rounded-2xl bg-background/50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-sm">Image Alt Labels ({data.images?.length || 0})</h4>
            <div className="text-xs text-muted-foreground">
              Missing alt text:{" "}
              <span className="text-destructive font-bold">{data.meta.imgMissingAlt}</span>
            </div>
          </div>
          {data.images && data.images.length > 0 ? (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {data.images.map((img, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl border border-border bg-card/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono text-muted-foreground truncate hover:text-foreground select-all">
                      {img.src}
                    </p>
                    <div className="text-sm mt-1 text-foreground">
                      {img.hasAlt ? (
                        <span className="text-muted-foreground italic">
                          Alt: &quot;{img.alt}&quot;
                        </span>
                      ) : (
                        <span className="text-destructive font-medium text-xs bg-destructive/10 px-2 py-0.5 rounded">
                          Missing Alt Tag
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {img.hasAlt ? (
                      <CheckCircle2 className="h-5 w-5 text-chart-3 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No images found on this page.</p>
          )}
        </TabsContent>

        <TabsContent
          value="links"
          className="mt-4 border border-border rounded-2xl bg-background/50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-sm">
              Extracted Page Links ({data.extractedLinks?.length || 0})
            </h4>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span>
                Internal:{" "}
                <span className="font-semibold text-foreground">{data.meta.internalLinks}</span>
              </span>
              <span>
                External:{" "}
                <span className="font-semibold text-foreground">{data.meta.externalLinks}</span>
              </span>
            </div>
          </div>
          {data.extractedLinks && data.extractedLinks.length > 0 ? (
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2">
              {data.extractedLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl border border-border bg-card/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{link.text}</p>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary hover:underline truncate block mt-0.5 font-mono"
                    >
                      {link.href}
                    </a>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded shrink-0 ${
                      link.isExternal
                        ? "bg-chart-4/10 text-chart-4 border border-chart-4/20"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {link.isExternal ? "External" : "Internal"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No links extracted from this page.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ArrowRight, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScanForm({ size = "lg" }: { size?: "lg" | "sm" }) {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = url.trim();
    if (!clean) return;
    const searchParams: { url: string; keyword?: string } = { url: clean };
    if (keyword.trim()) {
      searchParams.keyword = keyword.trim();
    }
    navigate({ to: "/report", search: searchParams });
  }

  return (
    <form onSubmit={submit} className="w-full text-left">
      <div
        className={`glass flex items-center gap-2 rounded-2xl p-2 shadow-lg ${
          size === "lg" ? "sm:p-2.5" : ""
        }`}
      >
        <div className="flex flex-1 items-center gap-2 pl-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL (e.g. yoursite.lovable.app)"
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground sm:text-base"
            aria-label="Website URL"
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`shrink-0 text-muted-foreground hover:text-foreground ${
            showAdvanced ? "bg-primary/10 text-primary" : ""
          }`}
          title="Advanced options"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button type="submit" size={size === "lg" ? "lg" : "default"} className="shrink-0 gap-1.5">
          Scan Now <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {showAdvanced && (
        <div className="mt-3 rounded-2xl border border-border bg-card/60 p-4 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Target Keyword Audit
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Target a specific keyword to run on-page keyword density and placement audits.
          </p>
          <div className="mt-3">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. web design, seo audit, portfolio"
              className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
              aria-label="Target Keyword"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setUrl("https://lovable.dev")}
        className="mt-2 pl-4 text-xs text-muted-foreground hover:text-foreground"
      >
        Try an example: lovable.dev
      </button>
    </form>
  );
}

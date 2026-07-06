import { Calendar } from "lucide-react";

export function CalendlyEmbed({
  url = "https://calendly.com/fahidaliofficial/30min",
  height = 700,
}: {
  url?: string;
  height?: number;
}) {
  const src = `${url}?hide_gdpr_banner=1&background_color=141422&text_color=e8e8f0&primary_color=7c6cf0`;
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/50 shadow-lg">
      <div className="flex items-center gap-2 border-b border-border bg-card/60 px-5 py-3 text-sm font-medium">
        <Calendar className="h-4 w-4 text-primary" />
        Book a free 30-minute strategy session
      </div>
      <iframe
        src={src}
        title="Schedule a call on Calendly"
        loading="lazy"
        className="w-full"
        style={{ height, border: "none" }}
      />
    </div>
  );
}

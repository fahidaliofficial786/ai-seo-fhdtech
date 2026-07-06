import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Home,
  ClipboardCheck,
  BookOpen,
  HelpCircle,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/site-data";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/checklist", label: "Checklist", icon: ClipboardCheck },
  { to: "/guide", label: "AI SEO Guide", icon: BookOpen },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/about", label: "About", icon: User },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img
            src={logo}
            alt="AI SEO Audit by FHDTech logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-base tracking-tight">
            AI SEO <span className="text-muted-foreground font-normal">/ FHDTech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href={CONTACT.calendly} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm">
              Book a call
            </Button>
          </a>
          <Link to="/">
            <Button size="sm">Free Scan</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-4 py-3 md:hidden space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground [&.active]:text-foreground"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{n.label}</span>
              </Link>
            );
          })}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      )}
    </header>
  );
}

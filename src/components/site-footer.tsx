import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/site-data";
import logo from "@/assets/logo.png";
import {
  Instagram,
  Facebook,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  Video,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const SOCIAL_ICONS: Record<string, any> = {
  Instagram: Instagram,
  Facebook: Facebook,
  TikTok: Video,
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  YouTube: Youtube,
  Telegram: Send,
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur-md overflow-hidden">
      {/* Decorative Radial Gradients */}
      <div className="absolute -bottom-24 -left-20 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute -bottom-24 -right-20 -z-10 h-72 w-72 rounded-full bg-chart-3/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4 lg:gap-16">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <img
                src={logo}
                alt="AI SEO Audit by FHDTech logo"
                width={36}
                height={36}
                loading="lazy"
                className="h-9 w-9 rounded-xl border border-border/80 bg-background/50 p-1"
              />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                AI SEO Audit
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The world's most comprehensive SEO audit platform built for modern AI-generated
              websites. Created by FHDTech.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { to: "/", label: "Free Scan" },
                { to: "/checklist", label: "SEO Checklist" },
                { to: "/guide", label: "AI SEO Guide" },
                { to: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1 hover:text-primary transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { to: "/about", label: "About Profile" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1 hover:text-primary transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 hover:text-primary transition-all duration-300 hover:translate-x-1"
                >
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                  <span className="flex items-center gap-0.5">
                    Portfolio <ExternalLink className="h-3 w-3 opacity-60" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 hover:text-primary transition-all duration-300 hover:translate-x-1"
                >
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                  <span>Book a Call</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links with Icons */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">
              Connect
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {CONTACT.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.name] || Link;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-all duration-300 hover:translate-x-1 group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-background/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                      <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                    </div>
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8">
          <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} FHDTech · aiseo.fhdtech.com. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="hover:text-primary cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span>·</span>
              <span className="hover:text-primary cursor-pointer transition-colors">
                Terms of Service
              </span>
              <span>·</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Cookies</span>
              <span>·</span>
              <span className="hover:text-primary cursor-pointer transition-colors">
                Disclaimer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

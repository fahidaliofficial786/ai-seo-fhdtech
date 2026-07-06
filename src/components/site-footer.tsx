import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/site-data";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-semibold">
            <img
              src={logo}
              alt="AI SEO Audit by FHDTech logo"
              width={32}
              height={32}
              loading="lazy"
              className="h-8 w-8"
            />
            AI SEO Audit
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The most comprehensive SEO audit platform for AI-generated websites. Built by FHDTech.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Free Scan
              </Link>
            </li>
            <li>
              <Link to="/checklist" className="hover:text-foreground">
                SEO Checklist
              </Link>
            </li>
            <li>
              <Link to="/guide" className="hover:text-foreground">
                AI SEO Guide
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <a
                href={CONTACT.portfolio}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                Book a Call
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Connect</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {CONTACT.socials.map((sSocial) => (
              <li key={sSocial.name}>
                <a
                  href={sSocial.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  {sSocial.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} FHDTech · aiseo.fhdtech.com. All rights reserved.</p>
          <p>Privacy · Terms · Cookies · Disclaimer</p>
        </div>
      </div>
    </footer>
  );
}

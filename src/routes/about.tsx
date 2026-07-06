import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { CONTACT } from "@/lib/site-data";
import {
  Smartphone,
  ShieldCheck,
  Monitor,
  Zap,
  CheckCircle2,
  Award,
  Code2,
  Globe,
  Briefcase,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Fahid Ali | Web Developer & Automation Specialist" },
      {
        name: "description",
        content:
          "Fahid Ali is a web developer, automation specialist, and digital problem solver focusing on WordPress, GoHighLevel CRM, website security, and custom online platforms.",
      },
      { property: "og:title", content: "About Fahid Ali" },
      {
        property: "og:description",
        content:
          "Web developer & automation specialist building fast, secure, and scalable systems.",
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
          name: "About Fahid Ali",
          url: "https://aiseo.fhdtech.com/about",
          description:
            "Portfolio and biography of Fahid Ali, web developer and automation specialist.",
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
      <div className="relative overflow-hidden border-b border-border bg-card/10 py-16 sm:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 -z-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Who I Am
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl text-balance">
            Fahid Ali
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Web Developer, Automation Specialist &amp; Digital Problem Solver
          </p>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            I specialize in WordPress development, website security, marketing automation, and
            building scalable online platforms. Unlike many developers who focus only on writing
            code, my approach is strategic — ensuring websites perform exceptionally, secure data,
            and generate business value.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-20">
        {/* Core Description Grid */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Solving Real Digital Problems</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Over the years, I have worked with individuals, startups, and established businesses
              to build, secure, and optimize their digital presence. My work is centered around
              solving actual bottlenecks for clients — whether that means building a fast, optimized
              website, automating marketing systems, securing a vulnerable platform, or developing
              tools that improve business efficiency.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/30 p-6 flex flex-col justify-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Strategic Approach
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              I believe a website should not only look good but must perform optimally, generate
              leads, automate processes, and directly support business growth. My experience spans
              multiple disciplines, allowing me to deliver solutions that are practical, scalable,
              and business-focused.
            </p>
          </div>
        </section>

        {/* Journey */}
        <section className="rounded-3xl border border-border bg-gradient-to-br from-card/60 to-transparent p-8 space-y-4">
          <h2 className="text-2xl font-bold">My Journey Into Web Development</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            My journey began with a curiosity about how websites work and how businesses use them to
            scale. WordPress quickly became my primary platform because of its flexibility and
            powerful ecosystem. Over time, I transitioned from basic setups to building complex
            custom implementations, security hardening, and marketing automations.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Today, my daily work involves not only writing code and custom configurations but also
            consulting, troubleshooting complex security/performance bottlenecks, and designing
            digital infrastructures that help systems run more efficiently.
          </p>
        </section>

        {/* What I Do */}
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">What I Do</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Building and optimizing critical business systems.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Globe,
                title: "WordPress Development",
                desc: "Custom WordPress setups, theme customization, WooCommerce configs, API connections, and performance tuning.",
              },
              {
                icon: ShieldCheck,
                title: "Security & Malware Protection",
                desc: "Malware removal, security hardening, firewalls, and bot/VPN detection systems to protect active websites.",
              },
              {
                icon: Zap,
                title: "Marketing Automation & CRM",
                desc: "Setup and customization of CRM systems (including GoHighLevel), workflows, pipelines, booking systems, and funnels.",
              },
              {
                icon: Briefcase,
                title: "eCommerce Development",
                desc: "Creating high-converting WooCommerce stores with secure gateways, membership settings, and optimized checkouts.",
              },
              {
                icon: Terminal,
                title: "Game Portals & HTML5 Platforms",
                desc: "Building browser-based game portals optimized for high traffic, speed, and AdSense/advertising monetization.",
              },
              {
                icon: Smartphone,
                title: "Mobile App Conversion",
                desc: "Converting responsive web applications and portals into clean, ready-to-test Android APK packages.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-border bg-card/40 p-6 space-y-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Technical Skills</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "Web Development",
                skills: [
                  "WordPress",
                  "WooCommerce",
                  "HTML / CSS",
                  "JavaScript",
                  "PHP Customization",
                ],
              },
              {
                title: "Marketing Systems",
                skills: [
                  "GoHighLevel CRM",
                  "Funnel Building",
                  "Email Workflows",
                  "SMS Automation",
                  "Lead Pipelines",
                ],
              },
              {
                title: "Infrastructure",
                skills: [
                  "Website Migration",
                  "DNS Configuration",
                  "Server Optimization",
                  "SSL Hardening",
                ],
              },
              {
                title: "Security",
                skills: [
                  "Malware Cleanup",
                  "Traffic Auditing",
                  "Proxy & VPN Detection",
                  "Vulnerability Testing",
                ],
              },
            ].map((cat) => (
              <div
                key={cat.title}
                className="rounded-xl border border-border p-4 space-y-3 bg-card/20"
              >
                <h3 className="text-sm font-bold text-primary">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-t border-border pt-12 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">My Philosophy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I believe technology should simplify business operations rather than complicate them.
              A well-designed digital infrastructure must reduce manual work, improve speed, secure
              data, and provide a reliable, long-term user experience.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Future Goals</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looking ahead, my focus is on expanding capabilities in business automation, complex
              integrations, and web optimization technologies. I aim to build systems that automate
              repetitive workflows, driving conversion rates and scaling efficiency.
            </p>
          </div>
        </section>

        {/* Strategy Consultation Booking */}
        <div className="border-t border-border pt-12">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Let's work together
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Let's build something secure &amp; scalable
          </h2>
          <p className="mt-3 text-muted-foreground text-sm">
            Whether you need a new website, technical troubleshooting, CRM automations, or malware
            protection, I focus on delivering results-driven solutions. Book a slot below to talk.
          </p>
          <div className="mt-8">
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

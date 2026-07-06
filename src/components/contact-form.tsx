import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeorkqnk";

const schema = z.object({
  name: z.string().trim().nonempty("Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  website: z.string().trim().max(255).optional(),
  message: z.string().trim().nonempty("Please enter a message").max(1000),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const parsed = schema.safeParse({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      website: String(data.get("website") || ""),
      message: String(data.get("message") || ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
      formEl.reset();
      toast.success("Message sent! We'll get back to you shortly.");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp or email instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-card/50 p-6 shadow-lg">
      <h2 className="text-lg font-semibold">Send a message</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the form and we'll reply by email, usually within a few hours.
      </p>
      <div className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" maxLength={100} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            maxLength={255}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="website">Website to audit</Label>
          <Input id="website" name="website" placeholder="yoursite.lovable.app" maxLength={255} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="How can we help?"
            rows={4}
            maxLength={1000}
            required
          />
        </div>
        <Button type="submit" className="w-full gap-1.5" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : sent ? (
            <>
              <Send className="h-4 w-4" /> Send another message
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send message
            </>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          We respect your privacy — your details are only used to reply to you.
        </p>
      </div>
    </form>
  );
}

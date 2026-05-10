"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github, Instagram, Linkedin, MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { messagesService } from "@/services/firestore";
import type { ContactContent } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(8),
});

type FormType = z.infer<typeof schema>;

export function ContactSection({ contact }: { contact: ContactContent }) {
  const socialLinks = [
    { href: contact.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: contact.github, label: "GitHub", icon: Github },
    { href: contact.instagram, label: "Instagram", icon: Instagram },
    { href: contact.whatsapp, label: "WhatsApp", icon: MessageCircleMore },
  ].filter((item) => item.href);

  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormType>({ resolver: zodResolver(schema) });

  const submit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await messagesService.create(values);
      form.reset();
      toast.success("Message sent");
    } catch {
      toast.error("Unable to send message");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <section id="contact" className="space-y-8 border-t border-black/10 pt-8 md:pt-12">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">Contact</p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">Start a conversation</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-zinc-600">
            For product work, portfolio collaborations, and freelance conversations. I like projects with a clear visual standard and a real launch target.
          </p>
          <div className="space-y-4 text-sm uppercase tracking-[0.16em] text-zinc-500">
            <div>
              <p>Email</p>
              <p className="mt-1 text-base normal-case tracking-normal text-zinc-800">{contact.email || "your@email.com"}</p>
            </div>
            <div>
              <p>Phone</p>
              <p className="mt-1 text-base normal-case tracking-normal text-zinc-800">{contact.phone || "+00 00000000"}</p>
            </div>
            <div>
              <p>Location</p>
              <p className="mt-1 text-base normal-case tracking-normal text-zinc-800">{contact.location || "Your location"}</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm normal-case tracking-normal">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 font-medium text-zinc-800 transition hover:bg-black/5"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-black/10 bg-white/55 p-5 backdrop-blur md:p-7">
          <form onSubmit={submit} className="space-y-3">
            <Input placeholder="Name" {...form.register("name")} />
            <Input placeholder="Email" {...form.register("email")} />
            <Input placeholder="Subject" {...form.register("subject")} />
            <Textarea placeholder="Message" rows={6} {...form.register("message")} />
            <Button type="submit" disabled={submitting} className="min-w-40">
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

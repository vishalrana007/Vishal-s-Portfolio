"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Instagram, Linkedin, MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { messagesService } from "@/services/firestore";
import type { ContactContent, ContactSectionSettings } from "@/types/content";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export function ContactBlock({
  contact,
  settings,
}: {
  contact: ContactContent;
  settings: ContactSectionSettings;
}) {
  const socialLinks = [
    { href: contact.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: contact.github, label: "GitHub", icon: Github },
    { href: contact.instagram, label: "Instagram", icon: Instagram },
    { href: contact.whatsapp, label: "WhatsApp", icon: MessageCircleMore },
  ].filter((item) => item.href);

  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

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
    <ScrollReveal>
      <section id="contact" className="grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-6 md:grid-cols-[0.95fr_1.05fr] md:p-10">
      <div className="space-y-6">
        <p className="text-sm font-black uppercase tracking-[0.04em] text-white/72">{settings.label}</p>
        <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white md:text-6xl">
          {settings.heading}
        </h2>
        <p className="max-w-xl text-base leading-8 text-white/78 md:text-lg">{settings.description}</p>
        <div className="grid gap-4 pt-2 text-sm uppercase tracking-[0.04em] text-white/58 sm:grid-cols-2">
          <div>
            <p>Email</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block text-base normal-case tracking-normal text-white">
              {contact.email || "hello@example.com"}
            </a>
          </div>
          <div>
            <p>Phone</p>
            <p className="mt-2 text-base normal-case tracking-normal text-white">{contact.phone || "Add phone number"}</p>
          </div>
          <div>
            <p>Location</p>
            <p className="mt-2 text-base normal-case tracking-normal text-white">{contact.location || "Add location"}</p>
          </div>
          <div className="space-y-2">
            <p>Social</p>
            <div className="flex flex-wrap gap-3 text-base normal-case tracking-normal text-white">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="grid gap-3">
        <input
          {...form.register("name")}
          placeholder="Your name"
          className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[#ff6a00]"
        />
        <input
          {...form.register("email")}
          placeholder="Email address"
          className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[#ff6a00]"
        />
        <input
          {...form.register("subject")}
          placeholder="Project subject"
          className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[#ff6a00]"
        />
        <textarea
          {...form.register("message")}
          rows={7}
          placeholder="Tell me about the work you want to build"
          className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition focus:border-[#ff6a00]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="mt-3 inline-flex w-fit rounded-[18px] bg-[#ff6a00] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_0_28px_rgba(255,106,0,0.42)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : settings.ctaLabel}
        </button>
      </form>
      </section>
    </ScrollReveal>
  );
}

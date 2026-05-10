import Link from "next/link";
import { Github, Instagram, Linkedin, MessageCircleMore } from "lucide-react";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import type { ContactContent, SiteSettings } from "@/types/content";

export function PublicFooter({
  settings,
  contact,
}: {
  settings: SiteSettings;
  contact: ContactContent;
}) {
  const socialLinks = [
    { href: contact.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: contact.github, label: "GitHub", icon: Github },
    { href: contact.instagram, label: "Instagram", icon: Instagram },
    { href: contact.whatsapp, label: "WhatsApp", icon: MessageCircleMore },
  ].filter((item) => item.href);

  return (
    <ScrollReveal>
      <footer className="border-t border-white/10 bg-black">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.24),transparent_52%)]" />
          <div className="relative mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-24">
            <p className="text-center text-[3.6rem] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[6px_6px_0_rgba(255,106,0,0.9)] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">
              {settings.siteName || "Portfolio"}
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-6 text-sm font-semibold uppercase tracking-[0.04em] text-white md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/" className="text-[#ff6a00]">
              {settings.navigation.home || "Home"}
            </Link>
            <Link href="/projects">{settings.navigation.projects || "Projects"}</Link>
            <Link href="/skills">{settings.navigation.skills || "Skills"}</Link>
            <Link href="/experience">{settings.navigation.experience || "Experience"}</Link>
            <Link href="/#contact">{settings.navigation.contact || "Contact"}</Link>
          </div>
          <p className="text-white/70">{settings.footerText || "Selected work, thoughtfully presented."}</p>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.length ? (
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="rounded-full border border-white/12 p-2 text-white transition hover:border-white/30 hover:bg-white/8"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
            <a href={`mailto:${contact.email}`} className="text-base text-white">
              {contact.email || "hello@example.com"}
            </a>
          </div>
        </div>
      </footer>
    </ScrollReveal>
  );
}

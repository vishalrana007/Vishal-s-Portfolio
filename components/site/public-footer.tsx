import Link from "next/link";
import type { ContactContent, SiteSettings } from "@/types/content";

export function PublicFooter({
  settings,
  contact,
}: {
  settings: SiteSettings;
  contact: ContactContent;
}) {
  return (
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
        <a href={`mailto:${contact.email}`} className="text-base text-white">
          {contact.email || "hello@example.com"}
        </a>
      </div>
    </footer>
  );
}

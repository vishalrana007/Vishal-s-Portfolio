"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSettings } from "@/types/content";

export function PublicHeader({ settings, activePath = "/" }: { settings: SiteSettings; activePath?: string }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: settings.navigation.home || "Home" },
    { href: "/projects", label: settings.navigation.projects || "Projects" },
    { href: "/skills", label: settings.navigation.skills || "Skills" },
    { href: "/experience", label: settings.navigation.experience || "Experience" },
    { href: "/#contact", label: settings.navigation.contact || "Contact" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-5 py-5 md:px-8 md:py-7">
        <Link href="/" className="max-w-[170px] text-[2.1rem] font-black uppercase leading-none tracking-[-0.08em] text-white sm:text-[2.6rem]">
          <span className="block drop-shadow-[4px_4px_0_rgba(255,106,0,0.88)]">{settings.siteName || "Portfolio"}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-black uppercase tracking-[0.02em] text-white lg:flex">
          {navItems.map((item) => {
            const isActive = activePath === item.href || (item.href === "/#contact" && activePath === "#contact");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "text-[#ff6a00]" : "text-white transition hover:text-[#ff6a00]"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition hover:border-[#ff6a00] hover:text-[#ff6a00] lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="mx-5 rounded-[28px] border border-white/10 bg-black/92 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur md:mx-8 lg:hidden">
          <nav className="flex flex-col gap-2 text-base font-black uppercase tracking-[0.04em] text-white">
            {navItems.map((item) => {
              const isActive = activePath === item.href || (item.href === "/#contact" && activePath === "#contact");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 transition ${isActive ? "bg-[#ff6a00] text-white" : "bg-white/5 text-white hover:bg-white/10"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

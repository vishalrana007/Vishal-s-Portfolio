"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import type { HeroContent } from "@/types/content";
import { Button } from "@/components/ui/button";

export function HeroSection({ hero }: { hero: HeroContent }) {
  const typedRole = useTypingEffect(hero.typingRoles.length ? hero.typingRoles : [hero.role]);

  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b border-black/8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,245,0.18),rgba(255,251,245,0.72)_100%)]" />
      {hero.backgroundImage ? (
        <Image src={hero.backgroundImage} alt="" fill priority sizes="100vw" className="object-cover" />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,28,0.28),rgba(12,18,28,0.08)_24%,rgba(255,248,240,0.18)_58%,rgba(255,248,240,0.94)_100%)]" />
      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-5 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8">
        <header className="flex items-center justify-between gap-6 text-white">
          <Link href="/" className="text-xs font-medium uppercase tracking-[0.34em]">
            Portfolio
          </Link>
          <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-white/78 md:flex">
            <a href="#projects" className="transition hover:text-white">
              Work
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
        </header>
        <div className="mt-auto grid gap-10 pt-20 md:grid-cols-[1.35fr_0.65fr] md:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/78">Selected Portfolio</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.92] text-white sm:text-6xl md:text-8xl">
              {hero.title || "Portfolio Owner"}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              {hero.subtitle || "Add your intro in admin dashboard."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:justify-self-end">
            <div className="space-y-2 text-sm text-white/74">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/62">Current Focus</p>
              <p className="max-w-xs text-xl font-medium text-white">{typedRole || "Your role appears here"}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={hero.ctaHref || "#contact"}>
                <Button className="min-w-36">{hero.ctaText || "Start a Project"}</Button>
              </a>
              <a href="#projects">
                <Button variant="secondary" className="min-w-36 border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/18">
                  View Work
                </Button>
              </a>
            </div>
            <div className="grid gap-3 border-t border-white/18 pt-5 text-[11px] uppercase tracking-[0.18em] text-white/66 sm:grid-cols-3 md:grid-cols-1">
              <div>
                <p>Approach</p>
                <p className="mt-2 text-sm normal-case tracking-normal text-white">Editorial visuals, clean systems, strong presentation.</p>
              </div>
              <div>
                <p>Availability</p>
                <p className="mt-2 text-sm normal-case tracking-normal text-white">Open for selected freelance and product work.</p>
              </div>
              <div>
                <p>Base</p>
                <p className="mt-2 text-sm normal-case tracking-normal text-white">Remote collaboration, global projects.</p>
              </div>
            </div>
          </motion.div>
        </div>
        {hero.profileImage ? (
          <div className="absolute bottom-10 right-5 hidden h-28 w-24 overflow-hidden rounded-sm border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.22)] md:block md:right-8 md:h-40 md:w-32">
            <Image src={hero.profileImage} alt={hero.title || "Profile"} fill sizes="128px" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

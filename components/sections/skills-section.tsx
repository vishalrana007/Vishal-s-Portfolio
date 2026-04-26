"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Skill } from "@/types/content";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="space-y-8">
      <div className="flex flex-col gap-4 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between md:pt-12">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">Skills</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">Practical strengths</h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-zinc-600">
          Tools and technologies I reach for repeatedly when the work needs to look polished, ship cleanly, and hold up under real use.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <Link key={skill.id} href={`/skills/${skill.id}`} className="group">
            <article className="overflow-hidden border border-black/10 bg-white/55 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#eff6ff,#fff7ed)]">
                {skill.icon ? (
                  <Image src={skill.icon} alt={skill.name} fill className="object-contain transition duration-700 group-hover:scale-[1.04]" />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(20,24,30,0.45)_100%)]" />
                <div className="absolute left-0 right-0 top-0 flex items-start justify-between p-4 text-[11px] uppercase tracking-[0.18em] text-white/78">
                  <span>{skill.category}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-2xl font-semibold text-white">{skill.name}</h3>
                </div>
              </div>
              <div className="space-y-3 p-4">
                <div className="h-1.5 rounded-full bg-stone-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.8 }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-teal-700 via-sky-600 to-amber-500"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

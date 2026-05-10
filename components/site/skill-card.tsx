import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import type { Skill } from "@/types/content";

export function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  return (
    <ScrollReveal delay={index * 0.07}>
      <Link
        href={`/skills/${skill.id}`}
        className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] transition duration-500 hover:-translate-y-1"
      >
        <div className="relative aspect-[6/4] overflow-hidden">
          {skill.icon ? (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative h-28 w-28 md:h-32 md:w-32">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  sizes="128px"
                  className="object-contain opacity-90 transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#23140a,#0a0a0a)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-black">{skill.category || "Skill"}</span>
            <span className="text-sm font-semibold text-white/78">{skill.level}%</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
            <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-white">{skill.name}</h3>
            <p className="line-clamp-4 text-sm leading-6 text-white/74">
              {skill.description || "A practical capability used across product, design, and delivery work."}
            </p>
            <div className="h-2 rounded-full bg-white/15">
              <div className="h-2 rounded-full bg-[#ff6a00]" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

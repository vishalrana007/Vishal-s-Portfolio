import Link from "next/link";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import type { Experience } from "@/types/content";

export function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <ScrollReveal delay={index * 0.07}>
      <Link
        href={`/experience/${item.id}`}
        className={`grid gap-5 border-t border-white/10 px-1 py-8 transition hover:bg-white/4 md:gap-6 lg:grid-cols-[86px_minmax(0,0.7fr)_minmax(420px,1.2fr)] lg:items-start lg:gap-10 ${index === 0 ? "border-t-0" : ""}`}
      >
        <p className="text-[3.25rem] font-black leading-none tracking-[-0.08em] text-white/26 md:text-[4.5rem]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-white/58">
            {item.startDate} {item.endDate ? `- ${item.endDate}` : "- Present"}
          </p>
          <h3 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] text-white md:text-4xl xl:text-[2.8rem]">
            {item.role}
          </h3>
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-[#ff6a00]">{item.company}</p>
        </div>
        <p className="w-full text-sm leading-7 text-white/74 md:text-base">
          {item.description}
        </p>
      </Link>
    </ScrollReveal>
  );
}

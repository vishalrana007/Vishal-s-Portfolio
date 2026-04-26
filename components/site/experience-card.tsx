import Link from "next/link";
import type { Experience } from "@/types/content";

export function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <Link
      href={`/experience/${item.id}`}
      className={`grid gap-6 border-t border-white/10 px-1 py-8 transition hover:bg-white/4 md:grid-cols-[120px_1fr_120px] ${index === 0 ? "border-t-0" : ""}`}
    >
      <p className="text-[3.5rem] font-black leading-none tracking-[-0.08em] text-white/26 md:text-[5rem]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-white/58">
          {item.startDate} {item.endDate ? `- ${item.endDate}` : "- Present"}
        </p>
        <h3 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] text-white md:text-4xl">{item.role}</h3>
        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-[#ff6a00]">{item.company}</p>
      </div>
      <p className="max-w-sm text-base leading-7 text-white/74">{item.description}</p>
    </Link>
  );
}

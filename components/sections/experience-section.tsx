import type { Experience } from "@/types/content";
import Link from "next/link";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="space-y-8">
      <div className="flex flex-col gap-4 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between md:pt-12">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">Experience</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">Work history</h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-zinc-600">
          A record of product, design, and engineering work across projects that needed both a strong front-end sensibility and practical delivery.
        </p>
      </div>
      <div className="space-y-3">
        {experience.map((item) => (
          <Link key={item.id} href={`/experience/${item.id}`} className="block border-t border-black/10 py-5 transition hover:bg-white/35">
            <div className="grid gap-4 md:grid-cols-[180px_1fr_auto] md:items-start">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {item.startDate} - {item.endDate || "Present"}
              </p>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-zinc-900">{item.role}</h3>
                <p className="text-sm uppercase tracking-[0.16em] text-zinc-500">{item.company}</p>
                <p className="max-w-3xl text-sm leading-6 text-zinc-600">{item.description}</p>
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 md:pt-2">View</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

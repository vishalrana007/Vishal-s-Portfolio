import Link from "next/link";
import { ScrollReveal } from "@/components/site/scroll-reveal";

export function SectionIntro({
  label,
  heading,
  description,
  actionHref,
  actionLabel,
}: {
  label: string;
  heading: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <ScrollReveal className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="space-y-3">
        <p className="text-sm font-black uppercase tracking-[0.04em] text-white/72">{label}</p>
        <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white md:text-6xl">
          {heading}
        </h2>
      </div>
      <div className="max-w-xl space-y-5">
        <p className="text-base leading-8 text-white/78 md:text-lg">{description}</p>
        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className="inline-flex rounded-[18px] bg-[#ff6a00] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_0_28px_rgba(255,106,0,0.42)] transition hover:brightness-110"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </ScrollReveal>
  );
}

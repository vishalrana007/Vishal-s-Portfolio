import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { getCollectionDocument, getPortfolioData } from "@/lib/portfolio-repository";
import type { Skill } from "@/types/content";

export const runtime = "nodejs";

export default async function SkillDetailsPage(props: PageProps<"/skills/[id]">) {
  const { id } = await props.params;
  const [{ siteSettings, contact }, skill] = await Promise.all([
    getPortfolioData(),
    getCollectionDocument<Skill>("skills", id),
  ]);

  if (!skill) {
    notFound();
  }

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.22),transparent_34%),linear-gradient(180deg,#140b05,#050505)]">
        <PublicHeader settings={siteSettings} activePath="/skills" />
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-20 md:pt-36">
          <div className="space-y-5">
            <Link href="/skills" className="text-sm font-semibold uppercase tracking-[0.05em] text-white/70">
              Back to skills
            </Link>
            <p className="text-sm font-black uppercase tracking-[0.04em] text-[#ff6a00]">{skill.category || "Skill"}</p>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-[6rem]">
              {skill.name}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/78">
              A practical capability used in real projects and shown separately so the homepage stays curated instead of overloaded.
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
            <div className="relative aspect-[5/4]">
              {skill.icon ? (
                <Image src={skill.icon} alt={skill.name} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#23140a,#050505)]" />
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1600px] gap-8 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-20">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Proficiency</p>
          <p className="mt-4 text-7xl font-black leading-none tracking-[-0.08em] text-white">{skill.level}%</p>
        </section>
        <section className="space-y-5 rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Confidence bar</p>
          <div className="h-3 rounded-full bg-white/10">
            <div className="h-3 rounded-full bg-[#ff6a00]" style={{ width: `${skill.level}%` }} />
          </div>
          <p className="text-lg leading-8 text-white/78">
            This score represents how consistently this skill shows up across shipped work, client execution, and portfolio-quality presentation.
          </p>
        </section>
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

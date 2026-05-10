import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { getCollectionDocument, getPortfolioData } from "@/lib/portfolio-repository";
import type { Experience } from "@/types/content";

export const runtime = "nodejs";

export default async function ExperienceDetailsPage(props: PageProps<"/experience/[id]">) {
  const { id } = await props.params;
  const [{ siteSettings, contact }, item] = await Promise.all([
    getPortfolioData(),
    getCollectionDocument<Experience>("experience", id),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.22),transparent_34%),linear-gradient(180deg,#140b05,#050505)]">
        <PublicHeader settings={siteSettings} activePath="/experience" />
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
          <Link href="/experience" className="text-sm font-semibold uppercase tracking-[0.05em] text-white/70">
            Back to experience
          </Link>
          <div className="mt-8 grid gap-8 md:grid-cols-[0.6fr_1.4fr]">
            <ScrollReveal className="space-y-3">
              <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Timeline</p>
              <p className="text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-white">
                {item.startDate} {item.endDate ? `- ${item.endDate}` : "- Present"}
              </p>
            </ScrollReveal>
            <ScrollReveal className="space-y-5" delay={0.08}>
              <p className="text-sm font-black uppercase tracking-[0.04em] text-[#ff6a00]">{item.company}</p>
              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-[6rem]">
                {item.role}
              </h1>
              <p className="max-w-4xl text-lg leading-8 text-white/78">{item.description}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-20">
        <ScrollReveal>
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Highlights</p>
          {item.achievements.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {item.achievements.map((achievement) => (
                <div key={achievement} className="rounded-[24px] border border-white/10 bg-black/30 p-5 text-base leading-7 text-white/80">
                  {achievement}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-base leading-7 text-white/72">No additional highlights added yet.</p>
          )}
          </section>
        </ScrollReveal>
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

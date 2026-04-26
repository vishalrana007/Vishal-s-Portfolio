import { ExperienceCard } from "@/components/site/experience-card";
import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { SectionIntro } from "@/components/site/section-intro";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const runtime = "nodejs";

export default async function ExperiencePage() {
  const { experience, siteSettings, contact } = await getPortfolioData();
  const orderedExperience = [...experience].sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.2),transparent_30%),linear-gradient(180deg,#140b05,#050505)]">
        <PublicHeader settings={siteSettings} activePath="/experience" />
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
          <SectionIntro
            label={siteSettings.experience.label}
            heading={siteSettings.experience.heading}
            description={siteSettings.experience.description}
          />
        </div>
      </section>
      <main className="mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-20">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 md:p-8">
          {orderedExperience.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

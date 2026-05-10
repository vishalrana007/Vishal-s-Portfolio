import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { SectionIntro } from "@/components/site/section-intro";
import { SkillCard } from "@/components/site/skill-card";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const runtime = "nodejs";

export default async function SkillsPage() {
  const { skills, siteSettings, contact } = await getPortfolioData();
  const orderedSkills = [...skills].sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.2),transparent_35%),linear-gradient(180deg,#120904,#050505)]">
        <PublicHeader settings={siteSettings} activePath="/skills" />
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
          <SectionIntro
            label={siteSettings.skills.label}
            heading={siteSettings.skills.heading}
            description={siteSettings.skills.description}
          />
        </div>
      </section>
      <main className="mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orderedSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

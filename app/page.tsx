import Image from "next/image";
import Link from "next/link";
import { ContactBlock } from "@/components/site/contact-block";
import { ExperienceCard } from "@/components/site/experience-card";
import { ProjectCard } from "@/components/site/project-card";
import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { SectionIntro } from "@/components/site/section-intro";
import { SkillCard } from "@/components/site/skill-card";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const runtime = "nodejs";

export default async function HomePage() {
  const { hero, about, contact, siteSettings, skills, projects, experience } = await getPortfolioData();
  console.log("Projects:", projects);

  const homepageProjects = [...projects]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title))
    .slice(0, Math.max(1, siteSettings.projects.limit));
  const homepageSkills = [...skills]
    .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name))
    .slice(0, Math.max(1, siteSettings.skills.limit));
  const homepageExperience = [...experience]
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .slice(0, Math.max(1, siteSettings.experience.limit));

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative min-h-screen overflow-hidden">
        {hero.backgroundImage ? (
          <Image
            src={hero.backgroundImage}
            alt={hero.title || siteSettings.siteName}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#2a1408,transparent_34%),linear-gradient(135deg,#110a06_0%,#050505_60%,#130904_100%)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75),rgba(0,0,0,0.52)_35%,rgba(0,0,0,0.72)),linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.6))]" />
        <PublicHeader settings={siteSettings} activePath="/" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-end px-5 pb-18 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div className="max-w-4xl space-y-6">
            <p className="inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm font-semibold uppercase tracking-[0.06em] text-white/80">
              {siteSettings.heroBadge}
            </p>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl md:text-[7.5rem]">
              {hero.title || siteSettings.siteName}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/78 md:text-2xl md:leading-10">
              {hero.subtitle || siteSettings.siteTagline}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={hero.ctaHref || "/#contact"}
                className="rounded-[18px] bg-[#ff6a00] px-7 py-3 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_0_28px_rgba(255,106,0,0.42)] transition hover:brightness-110"
              >
                {hero.ctaText || "Start project"}
              </Link>
              <Link
                href="/projects"
                className="rounded-[18px] border border-white/20 bg-white/8 px-7 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:bg-white/14"
              >
                {siteSettings.projects.viewAllText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-24 px-5 py-16 md:px-8 md:gap-28 md:py-24">
        <section className="grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:items-start">
          <div className="space-y-3">
            <p className="text-sm font-black uppercase tracking-[0.04em] text-white/72">
              {siteSettings.aboutLabel || "About"}
            </p>
            <h2 className="text-4xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white md:text-6xl">
              {about.heading || "A clearer look at the work"}
            </h2>
          </div>
          <div className="space-y-8">
            <p className="max-w-4xl text-lg leading-9 text-white/78 md:text-[1.55rem]">
              {about.bio || siteSettings.siteTagline}
            </p>
            {about.highlights.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {about.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold uppercase tracking-[0.05em] text-white/82">
                    {highlight}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {siteSettings.projects.visible ? (
          <section className="space-y-10">
            <SectionIntro
              label={siteSettings.projects.label}
              heading={siteSettings.projects.heading}
              description={siteSettings.projects.description}
              actionHref="/projects"
              actionLabel={siteSettings.projects.viewAllText}
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {homepageProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        ) : null}

        {siteSettings.skills.visible ? (
          <section className="space-y-10">
            <SectionIntro
              label={siteSettings.skills.label}
              heading={siteSettings.skills.heading}
              description={siteSettings.skills.description}
              actionHref="/skills"
              actionLabel={siteSettings.skills.viewAllText}
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {homepageSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        ) : null}

        {siteSettings.experience.visible ? (
          <section className="space-y-10">
            <SectionIntro
              label={siteSettings.experience.label}
              heading={siteSettings.experience.heading}
              description={siteSettings.experience.description}
              actionHref="/experience"
              actionLabel={siteSettings.experience.viewAllText}
            />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 md:p-8">
              {homepageExperience.map((item, index) => (
                <ExperienceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </section>
        ) : null}

        {siteSettings.contact.visible ? <ContactBlock contact={contact} settings={siteSettings.contact} /> : null}
      </main>

      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

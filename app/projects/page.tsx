import Image from "next/image";
import { ProjectCard } from "@/components/site/project-card";
import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SectionIntro } from "@/components/site/section-intro";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const runtime = "nodejs";

export default async function ProjectsPage() {
  const { hero, projects, siteSettings, contact } = await getPortfolioData();
  const orderedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden">
        <div className="relative min-h-[70vh]">
          {hero.backgroundImage ? (
            <Image src={hero.backgroundImage} alt={siteSettings.projects.heading} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#23140a,#050505)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.76))]" />
          <PublicHeader settings={siteSettings} activePath="/projects" />
          <div className="relative mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
            <SectionIntro
              label={siteSettings.projects.label}
              heading={siteSettings.projects.heading}
              description={siteSettings.projects.description}
            />
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-[1600px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {orderedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

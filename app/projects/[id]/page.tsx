import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicFooter } from "@/components/site/public-footer";
import { PublicHeader } from "@/components/site/public-header";
import { getCollectionDocument, getPortfolioData } from "@/lib/portfolio-repository";
import type { Project } from "@/types/content";

export const runtime = "nodejs";

export default async function ProjectDetailsPage(props: PageProps<"/projects/[id]">) {
  const { id } = await props.params;
  const [{ siteSettings, contact }, project] = await Promise.all([
    getPortfolioData(),
    getCollectionDocument<Project>("projects", id),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative min-h-[78vh] overflow-hidden">
        {project.imageUrls[0] ? (
          <Image src={project.imageUrls[0]} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#23140a,#050505)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.36),rgba(0,0,0,0.82))]" />
        <PublicHeader settings={siteSettings} activePath="/projects" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
          <Link href="/projects" className="mb-6 text-sm font-semibold uppercase tracking-[0.05em] text-white/70">
            Back to projects
          </Link>
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div className="space-y-5">
              <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">
                {project.featured ? "Featured project" : "Project"}{project.category ? ` | ${project.category}` : ""}
              </p>
              <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white md:text-[6rem]">
                {project.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/78">{project.summary || project.description}</p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-white/10 bg-black/35 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Project facts</p>
              <div className="grid gap-3 text-sm text-white/78">
                {project.client ? <p><span className="text-white">Client:</span> {project.client}</p> : null}
                {project.year ? <p><span className="text-white">Year:</span> {project.year}</p> : null}
                {project.category ? <p><span className="text-white">Category:</span> {project.category}</p> : null}
              </div>
              {project.services?.length ? (
                <div className="space-y-2">
                  <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-sm text-white/84">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-sm text-white/84">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1600px] gap-8 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
        <section className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Overview</p>
          <p className="text-lg leading-9 text-white/80">{project.description}</p>
          {project.imageUrls.length > 1 ? (
            <div className="grid gap-4 pt-4 md:grid-cols-2">
              {project.imageUrls.filter(Boolean).slice(1).map((imageUrl, index) => (
                <div key={`${imageUrl}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10">
                  <Image
                    src={imageUrl}
                    alt={`${project.title} gallery ${index + 2}`}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </section>
        <aside className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="block text-base font-semibold uppercase tracking-[0.04em] text-white hover:text-[#ff6a00]">
              Live project
            </a>
          ) : null}
          {project.sourceUrl ? (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="block text-base font-semibold uppercase tracking-[0.04em] text-white hover:text-[#ff6a00]">
              Source code
            </a>
          ) : null}
        </aside>
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

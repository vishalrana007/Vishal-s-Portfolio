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

  const galleryImages = project.imageUrls.filter(Boolean).slice(1);

  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(53,102,180,0.18),transparent_30%),linear-gradient(180deg,#08111f_0%,#050505_72%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
        <PublicHeader settings={siteSettings} activePath="/projects" />
        <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
          <Link href="/projects" className="mb-8 inline-flex text-sm font-semibold uppercase tracking-[0.05em] text-white/70 transition hover:text-[#ff6a00]">
            Back to projects
          </Link>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] xl:items-center">
            <div className="space-y-6">
              <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">
                {project.featured ? "Featured project" : "Project"}{project.category ? ` | ${project.category}` : ""}
              </p>
              <h1 className="max-w-5xl text-3xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-[3rem] xl:text-[3.2rem]">
                {project.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/78 md:text-[1.2rem] md:leading-9">
                {project.summary || project.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[18px] bg-[#ff6a00] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_0_28px_rgba(255,106,0,0.35)] transition hover:brightness-110"
                  >
                    View live
                  </a>
                ) : null}
                {project.sourceUrl ? (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[18px] border border-white/15 bg-white/6 px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:bg-white/10"
                  >
                    View source
                  </a>
                ) : null}
              </div>
            </div>
            <div>
              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
                {project.imageUrls[0] ? (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.imageUrls[0]}
                      alt={project.title}
                      fill
                      priority
                      sizes="(max-width: 1279px) 100vw, 42vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-[linear-gradient(135deg,#23140a,#050505)]" />
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4 rounded-[28px] border border-white/10 bg-black/35 p-6 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Project facts</p>
            <div className="grid gap-3 text-sm text-white/78 md:grid-cols-3">
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
            <div className="space-y-2">
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

      <main className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        <section className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.04em] text-white/70">Overview</p>
          <p className="text-lg leading-9 text-white/80">{project.description}</p>
          {galleryImages.length ? (
            <div className="grid gap-4 pt-4 md:grid-cols-2">
              {galleryImages.map((imageUrl, index) => (
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
      </main>
      <PublicFooter settings={siteSettings} contact={contact} />
    </div>
  );
}

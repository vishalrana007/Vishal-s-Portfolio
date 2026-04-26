import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {project.imageUrls[0] ? (
          <Image
            src={project.imageUrls[0]}
            alt={project.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#3a200f,#0a0a0a)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.76))]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-sm text-white/92">
          <span className="rounded-full bg-white/90 px-3 py-1 font-medium text-black">{project.category || "@work"}</span>
          <span className="font-semibold uppercase tracking-[0.05em]">{project.featured ? "Featured" : "Project"}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
          <h3 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] text-white">{project.title}</h3>
          <p className="line-clamp-3 max-w-md text-sm leading-6 text-white/76">{project.summary || project.description}</p>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="space-y-8">
      <div className="flex flex-col gap-4 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between md:pt-12">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">Projects</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">Selected builds</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-zinc-600">
          Image-led case studies, brand-conscious interfaces, and product work shaped to be viewed as finished pieces rather than feature lists.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div key={project.id} whileHover={{ y: -8 }} className={index % 2 === 1 ? "md:translate-y-16" : ""}>
            <Link href={`/projects/${project.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                {project.imageUrls[0] ? (
                  <Image src={project.imageUrls[0]} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-400">No image</div>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,19,28,0.02),rgba(14,19,28,0.16)_55%,rgba(14,19,28,0.76)_100%)]" />
                <div className="absolute left-0 right-0 top-0 flex items-start justify-between p-5 text-[11px] uppercase tracking-[0.18em] text-white/78">
                  <span>{project.featured ? "Featured" : "Project"}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <div className="max-w-md space-y-3">
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
                    <p className="max-w-md text-sm leading-6 text-white/74">{project.description}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-white/82">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="border border-white/18 bg-white/10 px-2.5 py-1 backdrop-blur">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

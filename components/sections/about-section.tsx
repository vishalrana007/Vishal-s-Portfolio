"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/types/content";

export function AboutSection({ about }: { about: AboutContent }) {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-5"
    >
      <div className="grid gap-8 border-t border-black/10 pt-8 md:grid-cols-[0.6fr_1.4fr] md:pt-12">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">About</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
            {about.heading || "A clearer picture of the work"}
          </h2>
        </div>
        <div className="space-y-8">
          <p className="max-w-4xl text-lg leading-8 text-zinc-700 md:text-[1.32rem] md:leading-9">
            {about.bio || "Add an about description from the admin dashboard."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {about.highlights.map((highlight) => (
              <div key={highlight} className="border-t border-black/10 pt-3 text-sm uppercase tracking-[0.14em] text-zinc-600">
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

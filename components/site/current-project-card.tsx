import Image from "next/image";
import type { CurrentProject } from "@/types/content";

export function CurrentProjectCard({ item }: { item: CurrentProject }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
      {item.imageUrl ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#08111f]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,13,0.02)_0%,rgba(4,7,13,0.32)_100%)]" />
        </div>
      ) : (
        <div className="flex min-h-36 items-center border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.22),transparent_38%),linear-gradient(135deg,#101622_0%,#0a0f1a_100%)] px-6 py-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-white/55">No image added</p>
        </div>
      )}

      <div className="space-y-4 p-6">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#ff6a00]">Currently working on</p>
        <h3 className="text-2xl font-black uppercase leading-[1] tracking-[-0.05em] text-white">
          {item.title}
        </h3>
        <p className="text-base leading-8 text-white/76">{item.overview}</p>
      </div>
    </article>
  );
}

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

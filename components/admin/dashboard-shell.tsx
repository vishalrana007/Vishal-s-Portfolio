"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, FileStack, LayoutTemplate, LogOut, Mail, MessageSquareMore, Search, Settings2, Sparkles, UserRound } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin/dashboard/hero", label: "Hero", icon: LayoutTemplate },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings2 },
  { href: "/admin/dashboard/about", label: "About", icon: UserRound },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/dashboard/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/admin/dashboard/current-projects", label: "Current Work", icon: BriefcaseBusiness },
  { href: "/admin/dashboard/experience", label: "Experience", icon: FileStack },
  { href: "/admin/dashboard/contact", label: "Contact", icon: Mail },
  { href: "/admin/dashboard/messages", label: "Messages", icon: MessageSquareMore },
  { href: "/admin/dashboard/queries", label: "Queries", icon: Search },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentLabel = navItems.find((item) => item.href === pathname)?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#f8fafc_22%,#eef2ff_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <Link href="/admin/dashboard/hero" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Admin Console
            </Link>
            <p className="mt-1 text-sm text-slate-500">Manage portfolio sections, project galleries, and incoming messages.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => signOut(auth)} className="inline-flex items-center gap-2">
              <LogOut size={14} /> Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[248px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Workspace</p>
            <p className="mt-2 text-sm text-slate-600">Cleaner contrast, better readability, and more room for content editing.</p>
          </div>
          <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition last:mb-0",
                    isActive
                      ? "bg-[linear-gradient(135deg,#f97316_0%,#ff6a00_55%,#ea580c_100%)] text-white shadow-[0_10px_24px_rgba(249,115,22,0.22)]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Current section</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-lg font-semibold text-slate-900">{currentLabel}</p>
              <p className="text-sm text-slate-500">Use this panel to keep the public site curated and easy to maintain.</p>
            </div>
          </div>
          <div className="space-y-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

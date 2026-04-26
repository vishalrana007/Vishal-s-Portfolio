import { AdminGuard } from "@/components/admin/admin-guard";
import { DashboardShell } from "@/components/admin/dashboard-shell";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <DashboardShell>{children}</DashboardShell>
    </AdminGuard>
  );
}

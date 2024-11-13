import { AdminGuard } from "@/components/auth/AdminGuard";
import { BlogGenerator } from "@/components/admin/BlogGenerator";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <BlogGenerator />
      </div>
    </AdminGuard>
  );
}
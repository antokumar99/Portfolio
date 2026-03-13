import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect }    from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader }  from "@/components/admin/AdminHeader";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-void-950 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        <AdminHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

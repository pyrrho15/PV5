import Sidebar from "@/components/admin/Sidebar";

// Shared layout for every /admin page. Sidebar on the left,
// page content on the right.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-7xl mx-auto border bg-white text-zinc-900">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
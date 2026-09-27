"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The nav links shown in the sidebar.
const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/links", label: "Links" },
  { href: "/admin/tech-stack", label: "Tech Stack" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/work", label: "Work" },
];

// Sidebar is a client component because it uses usePathname()
// to highlight the link for the page you are currently on.
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 p-4">
      <Link href="/admin" className="mb-6 block text-lg font-bold text-zinc-900">
        Admin
      </Link>
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => {
          // Mark the current page's link as active.
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm ${
                isActive
                  ? "bg-zinc-900 font-medium text-white"
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
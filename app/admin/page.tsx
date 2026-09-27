import Link from "next/link";

// Simple server component: just a landing page with links
// to each admin section. No data fetching needed here.
const sections = [
  {
    href: "/admin/profile",
    title: "Profile",
    description: "Edit your name, about text and profile image.",
  },
  {
    href: "/admin/links",
    title: "Links",
    description: "Edit your contact and social links.",
  },
  {
    href: "/admin/tech-stack",
    title: "Tech Stack",
    description: "Manage the list of technologies you know.",
  },
  {
    href: "/admin/projects",
    title: "Projects",
    description: "Manage your portfolio projects.",
  },
  {
    href: "/admin/blogs",
    title: "Blogs",
    description: "Manage your blog posts.",
  },
  {
    href: "/admin/work",
    title: "Work",
    description: "Manage your work experience.",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-zinc-900">Dashboard</h1>
      <p className="mb-8 text-sm text-zinc-500">
        Manage all the content for your portfolio.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-zinc-200 p-5 transition hover:border-zinc-400 hover:shadow-sm"
          >
            <h2 className="mb-1 font-semibold text-zinc-900">{section.title}</h2>
            <p className="text-sm text-zinc-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
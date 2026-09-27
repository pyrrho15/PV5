"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: number;
  name: string;
  about: string;
  image: string;
  githubLink: string;
  liveDemo: string;
  techStackIds: number[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list once when the page opens.
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/admin/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this project?")) return;

    // DELETE via the API, then remove the project from the local state
    // so the list updates without a full reload.
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete the project.");
        return;
      }
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the project.");
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Projects</h1>
          <p className="text-sm text-zinc-500">
            Every project in your portfolio.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Add new
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No projects yet. Click &quot;Add new&quot; to create one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {project.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        project.status
                          ? "bg-green-100 text-green-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {project.status ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex justify-end gap-2 px-4 py-3">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-sm text-zinc-600 underline hover:text-zinc-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-sm text-red-600 underline hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
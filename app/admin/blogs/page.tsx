"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  id: number;
  name: string;
  about: string;
  image: string;
  liveLink: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list once when the page opens.
  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/admin/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this blog?")) return;

    // DELETE via the API, then remove the blog from the local state
    // so the list updates without a full reload.
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete the blog.");
        return;
      }
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the blog.");
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Blogs</h1>
          <p className="text-sm text-zinc-500">Every blog post.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Add new
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No blogs yet. Click &quot;Add new&quot; to create one.
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
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {blog.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        blog.status
                          ? "bg-green-100 text-green-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {blog.status ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex justify-end gap-2 px-4 py-3">
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="text-sm text-zinc-600 underline hover:text-zinc-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
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
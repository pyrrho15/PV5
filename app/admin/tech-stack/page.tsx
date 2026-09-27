"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type TechStackItem = {
  id: number;
  name: string;
  icon: string | null;
  category: string;
};

// Nice labels for the DB enum values, used in the table below.
const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  language: "Language",
  tool: "Tool",
};

export default function TechStackListPage() {
  const [items, setItems] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list once when the page opens.
  useEffect(() => {
    async function loadItems() {
      try {
        const res = await fetch("/api/admin/tech-stack");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this tech stack item?")) return;

    // DELETE via the API, then remove the item from the local state
    // so the list updates without a full reload.
    try {
      const res = await fetch(`/api/admin/tech-stack/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete the tech stack item.");
        return;
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the tech stack item.");
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Tech Stack</h1>
          <p className="text-sm text-zinc-500">
            Every technology you know, grouped by category.
          </p>
        </div>
        <Link
          href="/admin/tech-stack/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Add new
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No tech stack items yet. Click &quot;Add new&quot; to create one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Icon</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-zinc-900">{item.name}</td>
                  <td className="px-4 py-3 text-zinc-500">
                    {item.icon || "\u2014"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      {CATEGORY_LABELS[item.category] || item.category}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-4 py-3">
                    <Link
                      href={`/admin/tech-stack/${item.id}/edit`}
                      className="text-sm text-zinc-600 underline hover:text-zinc-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
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
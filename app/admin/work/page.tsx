"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type WorkEntry = {
  id: number;
  name: string;
  image: string;
  workDone: string;
  type: string;
  role: string;
  timeline: string;
  techStackIds: number[];
  createdAt: string;
  updatedAt: string;
};

export default function WorkListPage() {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list once when the page opens.
  useEffect(() => {
    async function loadEntries() {
      try {
        const res = await fetch("/api/admin/work");
        const data = await res.json();
        setEntries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadEntries();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this work experience entry?")) return;

    // DELETE via the API, then remove the entry from the local state
    // so the list updates without a full reload.
    try {
      const res = await fetch(`/api/admin/work/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete the work experience entry.");
        return;
      }
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the work experience entry.");
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Work experience</h1>
          <p className="text-sm text-zinc-500">
            Every job, internship or project experience.
          </p>
        </div>
        <Link
          href="/admin/work/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Add new
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No work experience entries yet. Click &quot;Add new&quot; to create one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Timeline</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {entry.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{entry.role}</td>
                  <td className="px-4 py-3 text-zinc-500">{entry.timeline}</td>
                  <td className="flex justify-end gap-2 px-4 py-3">
                    <Link
                      href={`/admin/work/${entry.id}/edit`}
                      className="text-sm text-zinc-600 underline hover:text-zinc-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(entry.id)}
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
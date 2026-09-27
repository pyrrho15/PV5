"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/admin/TextField";

// The valid categories come from the tech_stack_category DB enum.
const CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "language",
  "tool",
];

export default function NewTechStackPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    icon: "",
    category: "frontend",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/tech-stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create the tech stack item.");
        return;
      }

      // Success -> go back to the list page.
      router.push("/admin/tech-stack");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Failed to create the tech stack item.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">
        Add tech stack item
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-6"
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="React"
        />
        <TextField
          label="Icon (optional)"
          name="icon"
          value={form.icon}
          onChange={handleChange}
          placeholder="Emoji or icon name, e.g. ⚛️"
        />

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-700">Category</span>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create item"}
        </button>
      </form>
    </div>
  );
}
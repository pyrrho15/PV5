"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/admin/TextField";
import ImageUpload from "@/components/admin/ImageUpload";
import TechStackPicker, {
  type TechStackOption,
} from "@/components/admin/TechStackPicker";

export default function NewWorkPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    image: "",
    workDone: "",
    type: "",
    role: "",
    timeline: "",
  });
  const [selectedTechStackIds, setSelectedTechStackIds] = useState<number[]>([]);
  const [techStackOptions, setTechStackOptions] = useState<TechStackOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load the tech stack options so the checkboxes can be shown.
  useEffect(() => {
    async function loadTechStack() {
      try {
        const res = await fetch("/api/admin/tech-stack");
        setTechStackOptions(await res.json());
      } catch (error) {
        console.error(error);
      }
    }
    loadTechStack();
  }, []);

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
      const res = await fetch("/api/admin/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          techStackIds: selectedTechStackIds,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create the work experience entry.");
        return;
      }

      // Success -> go back to the list page.
      router.push("/admin/work");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to create the work experience entry.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">
        Add work experience
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-6"
      >
        <TextField
          label="Company / organization"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Acme Corp"
        />
        <ImageUpload
          label="Work image"
          folder="work"
          value={form.image}
          onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
        />
        <TextField
          label="Work done"
          name="workDone"
          value={form.workDone}
          onChange={handleChange}
          textarea
          placeholder="What did you build or do there?"
        />
        <TextField
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="e.g. Full-time, Internship, Freelance"
        />
        <TextField
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="e.g. Software Engineer"
        />
        <TextField
          label="Timeline"
          name="timeline"
          value={form.timeline}
          onChange={handleChange}
          placeholder="e.g. Jan 2024 – Present"
        />

        <TechStackPicker
          options={techStackOptions}
          value={selectedTechStackIds}
          onChange={setSelectedTechStackIds}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create entry"}
        </button>
      </form>
    </div>
  );
}
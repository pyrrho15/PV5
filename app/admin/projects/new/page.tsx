"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/admin/TextField";
import ImageUpload from "@/components/admin/ImageUpload";
import TechStackPicker, {
  type TechStackOption,
} from "@/components/admin/TechStackPicker";

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    about: "",
    image: "",
    githubLink: "",
    liveDemo: "",
    status: false,
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
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          techStackIds: selectedTechStackIds,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create the project.");
        return;
      }

      // Success -> go back to the list page.
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to create the project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">Add project</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-6"
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="My awesome project"
        />
        <TextField
          label="About"
          name="about"
          value={form.about}
          onChange={handleChange}
          textarea
        />
        <ImageUpload
          label="Project image"
          folder="projects"
          value={form.image}
          onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
        />
        <TextField
          label="GitHub link"
          name="githubLink"
          value={form.githubLink}
          onChange={handleChange}
          placeholder="https://github.com/..."
        />
        <TextField
          label="Live demo link"
          name="liveDemo"
          value={form.liveDemo}
          onChange={handleChange}
          placeholder="https://..."
        />

        <TechStackPicker
          options={techStackOptions}
          value={selectedTechStackIds}
          onChange={setSelectedTechStackIds}
        />

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={form.status}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.checked }))
            }
          />
          Published (visible on the public site)
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create project"}
        </button>
      </form>
    </div>
  );
}
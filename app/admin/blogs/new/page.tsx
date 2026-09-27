"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/admin/TextField";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NewBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    about: "",
    image: "",
    liveLink: "",
    status: false,
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
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create the blog.");
        return;
      }

      // Success -> go back to the list page.
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Failed to create the blog.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">Add blog</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-6"
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="My blog post title"
        />
        <TextField
          label="About"
          name="about"
          value={form.about}
          onChange={handleChange}
          textarea
        />
        <ImageUpload
          label="Blog image"
          folder="blogs"
          value={form.image}
          onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
        />
        <TextField
          label="Live link"
          name="liveLink"
          value={form.liveLink}
          onChange={handleChange}
          placeholder="https://..."
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
          {saving ? "Saving..." : "Create blog"}
        </button>
      </form>
    </div>
  );
}
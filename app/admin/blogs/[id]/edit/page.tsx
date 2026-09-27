"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TextField from "@/components/admin/TextField";
import ImageUpload from "@/components/admin/ImageUpload";

type Blog = {
  id: number;
  name: string;
  about: string;
  image: string;
  liveLink: string;
  status: boolean;
};

export default function EditBlogPage() {
  // Dynamic routes like [id] work with useParams() in client components.
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    about: "",
    image: "",
    liveLink: "",
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load the blog being edited so the form is pre-filled.
  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (!res.ok) {
          setError("Blog not found.");
          return;
        }
        const data: Blog = await res.json();
        setForm({
          name: data.name,
          about: data.about,
          image: data.image,
          liveLink: data.liveLink,
          status: data.status,
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load the blog.");
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id]);

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
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save the blog.");
        return;
      }

      // Success -> go back to the list page.
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Failed to save the blog.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900">Edit blog</h1>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : (
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
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      )}
    </div>
  );
}
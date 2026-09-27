"use client";

import { useEffect, useState } from "react";
import TextField from "@/components/admin/TextField";

type Links = {
  id: number;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  resume: string;
};

// Client component because it fetches from the API and keeps
// form state in the browser.
export default function LinksPage() {
  const [form, setForm] = useState({
    email: "",
    linkedin: "",
    github: "",
    instagram: "",
    resume: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load the current links when the page opens.
  useEffect(() => {
    async function loadLinks() {
      try {
        const res = await fetch("/api/admin/links");
        const data: Links | null = await res.json();
        if (data) {
          setForm({
            email: data.email,
            linkedin: data.linkedin,
            github: data.github,
            instagram: data.instagram,
            resume: data.resume,
          });
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to load links.");
      } finally {
        setLoading(false);
      }
    }
    loadLinks();
  }, []);

  // Generic handler: updates the state matching the input's "name" attribute.
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || "Failed to save links.");
        return;
      }

      setMessage("Links saved!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save links.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-1 text-2xl font-bold text-zinc-900">Links</h1>
      <p className="mb-8 text-sm text-zinc-500">
        Your contact and social links.
      </p>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-6"
        >
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <TextField
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
          />
          <TextField
            label="GitHub"
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />
          <TextField
            label="Instagram"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
          />
          <TextField
            label="Resume URL"
            name="resume"
            value={form.resume}
            onChange={handleChange}
            placeholder="https://..."
          />

          {message && <p className="text-sm text-zinc-600">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save links"}
          </button>
        </form>
      )}
    </div>
  );
}
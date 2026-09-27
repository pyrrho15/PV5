"use client";

import { useEffect, useState } from "react";
import TextField from "@/components/admin/TextField";
import ImageUpload from "@/components/admin/ImageUpload";

type Profile = {
  id: number;
  name: string;
  about: string;
  image: string;
};

// Client component because it fetches from the API and keeps
// form state in the browser.
export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", about: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load the current profile when the page opens.
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data: Profile | null = await res.json();
        if (data) {
          setForm({
            name: data.name,
            about: data.about,
            image: data.image,
          });
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
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
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || "Failed to save profile.");
        return;
      }

      setMessage("Profile saved!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-1 text-2xl font-bold text-zinc-900">Profile</h1>
      <p className="mb-8 text-sm text-zinc-500">
        Your name, &quot;about me&quot; text and profile image URL.
      </p>

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
          />
          <TextField
            label="About"
            name="about"
            value={form.about}
            onChange={handleChange}
            textarea
          />
          <ImageUpload
            label="Profile image"
            folder="profile"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />

          {message && <p className="text-sm text-zinc-600">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
      )}
    </div>
  );
}
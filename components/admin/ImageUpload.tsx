"use client";

import { useRef, useState } from "react";

type ImageUploadProps = {
  label: string;
  value: string; // the current image URL stored in the form
  onChange: (url: string) => void;
  folder: "profile" | "projects" | "blogs" | "work";
};

// Reusable image picker + upload button.
//
// It uploads the chosen file to /api/files and then hands the resulting
// public URL back to the parent form with onChange(). The parent form
// simply saves that URL in its normal "image" field.
//
// We use a button (not a nested <form>) because this component is placed
// inside the page's main <form> and HTML does not allow nested forms.
export default function ImageUpload({
  label,
  value,
  onChange,
  folder,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    setUploading(true);
    setError("");

    const data = new FormData();
    data.set("file", file);
    data.set("folder", folder);

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Upload failed.");
        return;
      }

      // Give the public URL back to the form and clear the file input.
      onChange(result.url);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>

      {value ? (
        <div className="flex items-center gap-3">
          {/* Plain <img> because the image is served from an external URL. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="h-20 w-20 rounded-md border border-zinc-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-red-600 underline hover:text-red-800"
          >
            Remove image
          </button>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">No image uploaded yet.</p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm text-zinc-600 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:text-zinc-700 hover:file:bg-zinc-200"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !file}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <p className="text-xs text-zinc-400">Images only, max 1MB.</p>

      {value && <p className="break-all text-xs text-zinc-400">{value}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
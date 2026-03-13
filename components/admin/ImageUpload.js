/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

export function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 5 * 1024 * 1024)    { setError("Image must be under 5MB."); return; }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res  = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) onChange(data.url);
    else        setError(data.error || "Upload failed.");

    setUploading(false);
  }

  return (
    <div>
      {value ? (
        /* Preview */
        <div className="relative w-full h-40 rounded-sm overflow-hidden border border-void-700/40 bg-void-950">
          <img src={value} alt="Preview" className="w-full h-full object-cover opacity-80" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-void-950/80 border border-void-700/40
                       rounded-sm flex items-center justify-center text-void-400 hover:text-white
                       hover:bg-void-900 transition-all"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          className="w-full h-40 border border-dashed border-void-700/50 rounded-sm bg-void-950
                     flex flex-col items-center justify-center gap-2 cursor-pointer
                     hover:border-void-500/60 hover:bg-void-900/30 transition-all"
        >
          {uploading ? (
            <Loader2 size={24} className="text-void-500 animate-spin" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-sm bg-void-800/60 border border-void-700/30
                              flex items-center justify-center">
                <ImageIcon size={18} className="text-void-500" />
              </div>
              <p className="text-sm text-void-400">Drop image or <span className="text-void-300 underline">browse</span></p>
              <p className="label-tag text-void-700">PNG, JPG, WEBP — max 5MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-plasma-400 label-tag mt-2">{error}</p>}

      <input
        ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Or paste URL manually */}
      <div className="mt-2">
        <input
          type="url" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL directly..."
          className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5
                     text-void-100 focus:outline-none focus:border-void-500 text-sm"
        />
      </div>
    </div>
  );
}
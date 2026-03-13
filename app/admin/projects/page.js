/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ExternalLink, X, Star, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";

const EMPTY = { title: "", description: "", longDescription: "", tags: "", image: "", liveUrl: "", githubUrl: "", featured: false };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY);
  const [error,    setError]    = useState("");

  const [refresh, setRefresh] = useState(0);
  const refetch = () => setRefresh((n) => n + 1);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const res  = await fetch("/api/projects");
      const data = await res.json();
      if (active) { setProjects(data); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [refresh]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openNew  = () => { setForm(EMPTY); setEditing(null); setError(""); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, tags: p.tags.join(", ") }); setEditing(p); setError(""); setShowForm(true); };

  async function save() {
    if (!form.title || !form.description) { setError("Title and description are required."); return; }
    setSaving(true);
    const body = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    const res = await fetch("/api/projects", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing.id, ...body } : body),
    });
    if (res.ok) { setShowForm(false); refetch(); }
    else { const d = await res.json(); setError(d.error || "Failed to save."); }
    setSaving(false);
  }

  async function del(id) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    refetch();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white">Projects</h2>
        </div>
        <button onClick={openNew} className="btn-primary text-xs py-2">
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="text-void-500 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-void-700/20 bg-void-900/40">
                  {["Project", "Tags", "Status", "Actions"].map((h) => (
                    <th key={h} className={`px-5 py-3.5 label-tag text-void-600 ${h === "Actions" ? "text-right" : "text-left"} ${h === "Tags" ? "hidden md:table-cell" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-void-800/30">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-void-900/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm overflow-hidden bg-void-800 flex-shrink-0">
                          {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-void-100 truncate">{p.title}</p>
                          <p className="label-tag text-void-700 truncate max-w-[200px]">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="label-tag px-2 py-1 bg-void-800/60 text-void-500 rounded-sm">{t}</span>
                        ))}
                        {p.tags.length > 2 && <span className="label-tag text-void-700">+{p.tags.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 label-tag px-2.5 py-1.5 rounded-sm ${
                        p.featured ? "bg-void-500/15 text-void-300 border border-void-500/20" : "bg-void-900/40 text-void-600"
                      }`}>
                        {p.featured && <Star size={10} />}
                        {p.featured ? "Featured" : "Regular"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-void-600 hover:text-void-300 transition-colors">
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button onClick={() => openEdit(p)} className="p-1.5 text-void-600 hover:text-void-300 transition-colors">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => del(p.id)} className="p-1.5 text-void-600 hover:text-plasma-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {projects.length === 0 && (
              <p className="text-center label-tag text-void-700 py-16">No projects yet — add one above.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-void-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-void-900 border border-void-700/40 rounded-sm w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-void-700/20">
              <h3 className="font-display text-xl font-bold text-white">{editing ? "Edit Project" : "New Project"}</h3>
              <button onClick={() => setShowForm(false)} className="text-void-600 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-plasma-400 text-xs label-tag bg-plasma-500/10 border border-plasma-500/20 px-4 py-3 rounded-sm">{error}</p>}

              {/* Title */}
              <div>
                <label className="label-tag text-void-500 block mb-2">Title *</label>
                <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)}
                  placeholder="My Project"
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>

              {/* Short description */}
              <div>
                <label className="label-tag text-void-500 block mb-2">Short desc *</label>
                <input type="text" value={form.description} onChange={(e) => set("description", e.target.value)}
                  placeholder="One-liner..."
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>

              {/* ✅ Image upload — replaces old URL text input */}
              <div>
                <label className="label-tag text-void-500 block mb-2">Project Image</label>
                <ImageUpload value={form.image ?? ""} onChange={(url) => set("image", url)} />
              </div>

              {/* Live URL */}
              <div>
                <label className="label-tag text-void-500 block mb-2">Live URL</label>
                <input type="url" value={form.liveUrl ?? ""} onChange={(e) => set("liveUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="label-tag text-void-500 block mb-2">GitHub URL</label>
                <input type="url" value={form.githubUrl ?? ""} onChange={(e) => set("githubUrl", e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>

              {/* Tags */}
              <div>
                <label className="label-tag text-void-500 block mb-2">Tags (comma separated)</label>
                <input type="text" value={form.tags ?? ""} onChange={(e) => set("tags", e.target.value)}
                  placeholder="React, Node.js, Tailwind"
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>

              {/* Long description */}
              <div>
                <label className="label-tag text-void-500 block mb-2">Long description</label>
                <textarea rows={3} value={form.longDescription ?? ""} onChange={(e) => set("longDescription", e.target.value)}
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm resize-none" />
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-void-500" />
                <span className="text-sm text-void-300">Mark as featured project</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center text-sm py-2.5">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : "Save"}
                </button>
                <button onClick={() => setShowForm(false)} className="btn-ghost flex-1 justify-center text-sm py-2.5">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";

const CATS  = ["Frontend", "Backend", "DevOps", "Design", "Other"];
const EMPTY = { name: "", category: "Frontend", level: 80, icon: "" };

export default function AdminSkillsPage() {
  const [skills,   setSkills]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY);
  const [error,    setError]    = useState("");

  useEffect(() => { fetchSkills(); }, []);

  async function fetchSkills() {
    setLoading(true);
    const res  = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openNew  = () => { setForm(EMPTY); setEditing(null); setError(""); setShowForm(true); };
  const openEdit = (s) => { setForm(s); setEditing(s); setError(""); setShowForm(true); };

  async function save() {
    if (!form.name) { setError("Name is required."); return; }
    setSaving(true);
    const res = await fetch("/api/skills", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing.id, ...form } : form),
    });
    if (res.ok) { setShowForm(false); fetchSkills(); }
    else { const d = await res.json(); setError(d.error || "Failed to save."); }
    setSaving(false);
  }

  async function del(id) {
    if (!confirm("Delete this skill?")) return;
    await fetch("/api/skills", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchSkills();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-tag text-void-500 mb-1">// content</p>
          <h2 className="font-display text-2xl font-extrabold text-white">Skills</h2>
        </div>
        <button onClick={openNew} className="btn-primary text-xs py-2">
          <Plus size={15} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-void-500 animate-spin" />
        </div>
      ) : (
        CATS.map((cat) => {
          const list = skills.filter((s) => s.category === cat);
          if (!list.length) return null;
          return (
            <div key={cat} className="card overflow-hidden">
              <div className="px-5 py-3.5 border-b border-void-700/20 bg-void-900/40">
                <p className="label-tag text-void-500">{cat}</p>
              </div>
              <div className="divide-y divide-void-800/30">
                {list.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-4 px-5 py-4 hover:bg-void-900/30 transition-colors">
                    <span className="text-xl w-8 text-center leading-none">{skill.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-medium text-void-100">{skill.name}</p>
                        <span className="label-tag text-void-600">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-void-800/60 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg,#3d5aff,#7fff50)" }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button onClick={() => openEdit(skill)} className="p-1.5 text-void-600 hover:text-void-300 transition-colors">
                        <Edit size={15} />
                      </button>
                      <button onClick={() => del(skill.id)} className="p-1.5 text-void-600 hover:text-plasma-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {!loading && skills.length === 0 && (
        <p className="text-center label-tag text-void-700 py-16">No skills yet — add one above.</p>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-void-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-void-900 border border-void-700/40 rounded-sm w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-void-700/20">
              <h3 className="font-display text-xl font-bold text-white">{editing ? "Edit Skill" : "New Skill"}</h3>
              <button onClick={() => setShowForm(false)} className="text-void-600 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-plasma-400 text-xs label-tag bg-plasma-500/10 border border-plasma-500/20 px-4 py-3 rounded-sm">{error}</p>}
              <div>
                <label className="label-tag text-void-500 block mb-2">Name *</label>
                <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. TypeScript"
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>
              <div>
                <label className="label-tag text-void-500 block mb-2">Category</label>
                <select value={form.category} onChange={(e) => set("category", e.target.value)}
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm">
                  {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-tag text-void-500 block mb-2">Proficiency: {form.level}%</label>
                <input type="range" min="1" max="100" value={form.level}
                  onChange={(e) => set("level", parseInt(e.target.value))}
                  className="w-full accent-void-500" />
                <div className="h-1 bg-void-800/60 rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${form.level}%`, background: "linear-gradient(90deg,#3d5aff,#7fff50)" }} />
                </div>
              </div>
              <div>
                <label className="label-tag text-void-500 block mb-2">Icon (emoji)</label>
                <input type="text" value={form.icon} onChange={(e) => set("icon", e.target.value)}
                  placeholder="e.g. ⚡"
                  className="w-full bg-void-950 border border-void-700/40 rounded-sm px-4 py-2.5 text-void-100 focus:outline-none focus:border-void-500 text-sm" />
              </div>
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

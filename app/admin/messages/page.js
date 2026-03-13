"use client";
import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, Reply, X, Loader2 } from "lucide-react";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchMessages(); }, []);

  async function fetchMessages() {
    setLoading(true);
    const res  = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  }

  async function markRead(id) {
    await fetch("/api/messages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  }

  async function del(id) {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function open(m) {
    setSelected(m);
    if (!m.read) markRead(m.id);
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <p className="label-tag text-void-500 mb-1">// inbox</p>
        <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-3">
          Messages
          {unread > 0 && (
            <span className="text-sm bg-plasma-500 text-white font-bold px-2.5 py-1 rounded-full">
              {unread} new
            </span>
          )}
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-void-500 animate-spin" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-2">
            {messages.length === 0 ? (
              <div className="card p-8 text-center">
                <Mail size={32} className="text-void-800 mx-auto mb-3" />
                <p className="label-tag text-void-700">No messages yet</p>
              </div>
            ) : messages.map((m) => (
              <button
                key={m.id}
                onClick={() => open(m)}
                className={`w-full text-left p-4 rounded-sm border transition-all ${
                  selected?.id === m.id
                    ? "border-void-500/50 bg-void-500/8"
                    : m.read
                    ? "border-void-700/20 bg-void-900/30 hover:border-void-600/30"
                    : "border-void-500/20 bg-void-500/5 border-l-2 border-l-void-500 hover:bg-void-500/10"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`text-sm font-medium truncate ${m.read ? "text-void-400" : "text-void-100"}`}>
                    {m.name}
                  </p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {!m.read && <span className="w-2 h-2 bg-plasma-400 rounded-full" />}
                    {m.read
                      ? <MailOpen size={13} className="text-void-700" />
                      : <Mail     size={13} className="text-void-400" />
                    }
                  </div>
                </div>
                <p className="label-tag text-void-600 truncate">{m.subject}</p>
                <p className="label-tag text-void-800 mt-1">{formatDate(m.createdAt)}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="card overflow-hidden">
                <div className="p-5 border-b border-void-700/20 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-void-50 mb-1">{selected.subject}</h3>
                    <p className="text-sm text-void-400">
                      From: <span className="text-void-300">{selected.name}</span>{" "}
                      <span className="text-void-600">&lt;{selected.email}&gt;</span>
                    </p>
                    <p className="label-tag text-void-700 mt-0.5">{formatDate(selected.createdAt)}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-void-700 hover:text-void-300 flex-shrink-0">
                    <X size={18} />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-void-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                    {selected.message}
                  </p>
                </div>
                <div className="px-5 py-4 border-t border-void-700/20 flex gap-3">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary text-xs py-2">
                    <Reply size={14} /> Reply via Email
                  </a>
                  <button onClick={() => del(selected.id)} className="btn-ghost text-xs py-2 hover:border-plasma-500/50 hover:text-plasma-400">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-12 flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <MailOpen size={40} className="text-void-800 mx-auto mb-3" />
                  <p className="label-tag text-void-700">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

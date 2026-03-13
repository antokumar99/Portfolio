"use client";
import { useState } from "react";
import { Send, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32" style={{ background: "linear-gradient(0deg, rgba(61,90,255,0.04), transparent)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-16">
          Let&apos;s build together.
        </h2>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-10">
            <p className="text-void-300 leading-relaxed font-light">
              Have a project in mind, want to collaborate, or just want to say hi?
              Drop me a message — I&apos;ll reply within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail,    label: "Email",         value: "antokumar00@gmail.com"  },
                { icon: MapPin,  label: "Location",      value: "Khulna"   },
                { icon: Clock,   label: "Response time", value: "Within 24 hours"     },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-void-700/40 rounded-sm flex items-center justify-center text-void-400 flex-shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="label-tag text-void-600">{label}</p>
                    <p className="text-void-200 text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative */}
            <div className="p-6 border border-void-700/20 rounded-sm bg-void-900/30">
              <p className="label-tag text-void-600 mb-3">current status</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-neon-500 rounded-full animate-pulse" />
                <span className="text-neon-400 text-sm font-medium">Open to new opportunities</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="h-full flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <CheckCircle size={48} className="text-neon-400 mx-auto" />
                  <h3 className="font-display text-2xl font-bold text-white">Message sent!</h3>
                  <p className="text-void-400">I&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="btn-ghost text-sm py-2 mt-4">
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name",  label: "Your name",  type: "text",  placeholder: "Enter Your name"          },
                    { key: "email", label: "Email",       type: "email", placeholder: "enter your email"    },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="label-tag text-void-300 block mb-2 font-medium">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        required
                        className="w-full bg-void-900/60 border border-void-700/40 rounded-sm px-4 py-3
                                   text-void-100 placeholder-void-700 focus:outline-none focus:border-void-500
                                   transition-colors text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="label-tag text-void-300 block mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Project inquiry"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                    required
                    className="w-full bg-void-900/60 border border-void-700/40 rounded-sm px-4 py-3
                               text-void-100 placeholder-void-700 focus:outline-none focus:border-void-500
                               transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="label-tag text-void-300 block mb-2 font-medium">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    required
                    className="w-full bg-void-900/60 border border-void-700/40 rounded-sm px-4 py-3
                               text-void-100 placeholder-void-700 focus:outline-none focus:border-void-500
                               transition-colors text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-plasma-400 text-sm">Something went wrong. Please try again.</p>
                )}

                <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center">
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

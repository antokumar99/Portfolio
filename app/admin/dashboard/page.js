import { getAllProjects, getAllSkills, getAllMessages } from "@/lib/db";
import { FolderOpen, Code2, MessageSquare, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function DashboardPage() {
  const [projects, skills, messages] = await Promise.all([
    getAllProjects(),
    getAllSkills(),
    getAllMessages(),
  ]);

  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    {
      label: "Projects", value: projects.length,
      sub: `${projects.filter((p) => p.featured).length} featured`,
      icon: FolderOpen, href: "/admin/projects",
      accent: "text-void-400", glow: "rgba(61,90,255,0.3)",
    },
    {
      label: "Skills", value: skills.length,
      sub: `${[...new Set(skills.map((s) => s.category))].length} categories`,
      icon: Code2, href: "/admin/skills",
      accent: "text-neon-400", glow: "rgba(127,255,80,0.2)",
    },
    {
      label: "Messages", value: messages.length,
      sub: `${unread} unread`,
      icon: MessageSquare, href: "/admin/messages",
      accent: "text-plasma-400", glow: "rgba(255,61,122,0.2)",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="p-6 rounded-sm border border-void-500/20"
        style={{ background: "linear-gradient(135deg,rgba(61,90,255,0.08),transparent)" }}>
        <p className="label-tag text-void-500 mb-1">// welcome back</p>
        <h2 className="font-display text-2xl font-extrabold text-white">Portfolio Dashboard</h2>
        <p className="text-void-500 text-sm mt-1 font-light">Manage your content, skills, and messages from here.</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="card p-6 group hover:border-void-600/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-5">
              <div className="p-2.5 rounded-sm bg-void-900/80 border border-void-700/30">
                <s.icon size={20} className={s.accent} />
              </div>
              <ArrowUpRight size={16} className="text-void-700 group-hover:text-void-400 transition-colors" />
            </div>
            <p className={`font-display text-4xl font-extrabold ${s.accent}`}>{s.value}</p>
            <p className="text-void-200 text-sm font-medium mt-1">{s.label}</p>
            <p className="label-tag text-void-700 mt-1">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-void-700/20 flex items-center justify-between">
            <h3 className="font-semibold text-void-100 text-sm">Recent Projects</h3>
            <Link href="/admin/projects" className="label-tag text-void-500 hover:text-void-300 transition-colors">View all →</Link>
          </div>
          <div className="divide-y divide-void-800/40">
            {projects.slice(0, 4).map((p) => (
              <div key={p._id.toString()} className="flex items-center gap-3 px-5 py-3.5 hover:bg-void-900/30 transition-colors">
                <div className="w-9 h-9 rounded-sm overflow-hidden bg-void-800 flex-shrink-0">
                  {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-void-100 truncate">{p.title}</p>
                  <p className="label-tag text-void-700">{formatDate(p.createdAt)}</p>
                </div>
                {p.featured && (
                  <span className="label-tag text-void-400 bg-void-500/10 border border-void-500/20 px-2 py-1 rounded-sm flex-shrink-0">
                    ★ Featured
                  </span>
                )}
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-center label-tag text-void-700 py-8">No projects yet.</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-void-700/20 flex items-center justify-between">
            <h3 className="font-semibold text-void-100 text-sm flex items-center gap-2">
              Messages
              {unread > 0 && (
                <span className="w-5 h-5 bg-plasma-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </h3>
            <Link href="/admin/messages" className="label-tag text-void-500 hover:text-void-300 transition-colors">View all →</Link>
          </div>
          <div className="divide-y divide-void-800/40">
            {messages.slice(0, 4).map((m) => (
              <div key={m._id.toString()}
                className={`flex items-start gap-3 px-5 py-3.5 hover:bg-void-900/30 transition-colors ${!m.read ? "border-l-2 border-void-500" : ""}`}>
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${m.read ? "bg-void-900" : "bg-void-500/20"}`}>
                  <Mail size={14} className={m.read ? "text-void-600" : "text-void-400"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${m.read ? "text-void-400" : "text-void-100"}`}>{m.name}</p>
                  <p className="label-tag text-void-700 truncate">{m.subject}</p>
                </div>
                {!m.read && <span className="w-2 h-2 bg-plasma-400 rounded-full flex-shrink-0 mt-1.5" />}
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center label-tag text-void-700 py-8">No messages yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

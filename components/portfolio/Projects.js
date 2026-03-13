/* eslint-disable @next/next/no-img-element */
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export function Projects({ projects }) {
  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32" style={{ background: "linear-gradient(180deg, transparent, rgba(10,11,30,0.8), transparent)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white">
              Projects
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 label-tag text-void-600">
            <span>{projects.length} total</span>
            <div className="w-16 h-px bg-void-700/50" />
          </div>
        </div>

        {/* Featured */}
        <div className="space-y-32 mb-24">
          {featured.map((p, i) => (
            <article
              key={p.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "md:[&>:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative group">
                <div className="overflow-hidden rounded-sm border border-void-700/30 glow-border">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
                {/* Number stamp */}
                <span
                  className="absolute -top-5 -left-3 font-display text-[5rem] font-extrabold leading-none select-none pointer-events-none"
                  style={{ color: "rgba(61,90,255,0.08)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Copy */}
              <div>
                <p className="label-tag text-void-500 mb-2">
                  {String(i + 1).padStart(2, "0")} / Featured Project
                </p>
                <h3 className="font-display text-3xl font-extrabold text-white mb-4">{p.title}</h3>
                <div className="card p-5 mb-6 text-void-300 text-sm leading-relaxed">
                  {p.longDescription}
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tags.map((t) => (
                    <span key={t} className="label-tag px-3 py-1.5 border border-void-700/30 text-void-400 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-2">
                      <Github size={14} /> Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p) => (
                <div
                  key={p.id}
                  className="card p-6 group hover:border-void-500/40 hover:shadow-[0_0_24px_rgba(61,90,255,0.1)] transition-all duration-300"
                >
                  <div className="aspect-video rounded-sm overflow-hidden mb-5 bg-void-900">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-void-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-void-500 bg-void-800/60 px-2 py-0.5 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-void-500 hover:text-void-300 transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-void-500 hover:text-void-300 transition-colors">
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

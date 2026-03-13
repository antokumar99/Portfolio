export function Skills({ skills }) {
  const categories = [...new Set(skills.map((s) => s.category))];

  const extras = [
    "Firebase", "Vercel", "Nginx", "Linux", "Stripe", "WebSockets", "REST APIs", "CI/CD",
  ];

  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-20">
          Skills &amp; Tech
        </h2>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-14">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="label-tag text-void-500 flex items-center gap-3 mb-6">
                {cat}
                <span className="flex-1 h-px bg-void-800" />
              </p>
              <div className="space-y-5">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{skill.icon}</span>
                          <span className="text-sm font-medium text-void-200">{skill.name}</span>
                        </div>
                        <span className="label-tag text-void-600">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-void-800/60 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            background: "linear-gradient(90deg, #3d5aff, #a8ff78)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div className="mt-20 p-8 border border-void-700/20 rounded-sm bg-void-900/20">
          <div className="flex flex-wrap justify-center gap-2.5">
            {extras.map((t) => (
              <span
                key={t}
                className="px-4 py-2 label-tag border border-void-800 text-void-500 rounded-sm
                           hover:border-void-600 hover:text-void-300 transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

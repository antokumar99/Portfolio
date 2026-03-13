import Image from "next/image";

export function About() {
  const stats = [
    { value: "1+", label: "Years Experience" },
    { value: "5+", label: "Projects Shipped" },
    { value: "3",  label: "Tech Stack"      },
    { value: "100%", label: "Passion & Growth" },
  ];

  const stack = [
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Blockchain",
  ];

  return (
    <section id="about" className="py-32">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* Visual */}
        <div className="relative">
          {/* Outer glow frame */}
          <div className="absolute -inset-6 border border-void-500/10 rounded-sm" />
          <div className="absolute -inset-12 border border-void-500/5 rounded-sm" />
          {/* Photo card */}
          <div className="relative border border-void-700/40 rounded-sm overflow-hidden aspect-[4/5] max-w-sm mx-auto glow-border">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-void-700">
              <div
                className="w-80 h-80 rounded-full border-2 border-void-600 flex items-center justify-center text-4xl overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at 40% 40%, rgba(61,90,255,0.2), transparent)",
                }}
              >
                <Image
                  src="/IMG_50.JPG"
                  width={960}
                  height={960}
                  alt="Anto Kumar Paul"
                  className="object-cover rounded-full"
                />
              </div>

              <p className="text-sm text-void-300">Anto Kumar Paul</p>
            </div>

            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-void-500/60" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-void-500/60" />

            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-400/30 to-transparent animate-scan" />
          </div>
          {/* Floating badge */}
          <div className="absolute -right-4 -bottom-4 bg-void-900 px-5 py-4 rounded-sm shadow-[0_0_30px_rgba(61,90,255,0.5)]">
            <p className="font-display text-3xl font-extrabold text-white">
              1+
            </p>
            <p className="label-tag text-void-200 mt-0.5">Years Exp.</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            I turn ideas into{" "}
            <span className="neon-text italic">shipped products.</span>
          </h2>
          <p className="text-void-300 leading-relaxed mb-6 font-light ">
            I’m an aspiring full-stack web developer passionate about building
            useful and efficient web applications. Currently learning modern
            technologies like JavaScript, React, Node.js, and Next.js while
            building real projects to improve my skills. I enjoy solving
            problems, writing clean code, and understanding how scalable systems
            are designed. My goal is to grow into a strong software engineer by
            continuously learning and shipping practical projects.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-void-700/30 border border-void-700/30 rounded-sm overflow-hidden mb-10">
            {stats.map((s) => (
              <div key={s.label} className="bg-void-950/80 p-5">
                <p className="font-display text-3xl font-extrabold text-void-400">
                  {s.value}
                </p>
                <p className="label-tag text-void-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {stack.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 label-tag border border-void-700/40 text-void-300 rounded-sm
                           hover:border-void-500/60 hover:text-white transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a href="/resume.pdf" className="btn-primary" download="Anto_Kumar_Paul_Resume.pdf">
              Download CV
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

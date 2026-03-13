"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Twitter, Zap } from "lucide-react";

export function Hero() {
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      const w = window.innerWidth, h = window.innerHeight;
      if (orb1.current)
        orb1.current.style.transform = `translate(${(x / w) * 40 - 20}px, ${(y / h) * 40 - 20}px)`;
      if (orb2.current)
        orb2.current.style.transform = `translate(${(x / w) * -30 + 15}px, ${(y / h) * -30 + 15}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void-950">
      {/* Ambient orbs */}
      <div
        ref={orb1}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, rgba(61,90,255,0.12) 0%, transparent 70%)" }}
      />
      <div
        ref={orb2}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, rgba(127,255,80,0.06) 0%, transparent 70%)" }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,90,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(61,90,255,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Horizontal rule top / bottom */}
      <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-void-700/40 to-transparent" />
      <div className="absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-void-700/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-neon-400/30 rounded-full mb-8 bg-neon-400/5">
          <span className="w-2 h-2 bg-neon-500 rounded-full animate-pulse" />
          <span className="label-tag text-neon-400">Available for freelance &amp; full-time roles</span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold leading-[0.95] mb-6">
          <span className="block text-[clamp(2rem,6vw,5rem)] text-white">Building</span>
          <span className="block text-[clamp(2rem,6vw,5rem)] neon-text">the Future</span>
          <span className="block text-[clamp(2rem,6vw,5rem)] text-white">of the Web.</span>
        </h1>

        {/* Sub */}
        <p className="max-w-2xl mx-auto text-void-300 text-lg leading-relaxed mb-10 font-light">
          I&apos;m <strong className="text-sky-200 font-bold text-2xl">Anto Kumar Paul</strong> — a full-stack developer
          who crafts high-performance web products that live at the intersection of design and engineering.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a href="#projects" className="btn-primary">
            <Zap size={15} /> View My Work
          </a>
          <a href="#contact" className="btn-ghost">
            Start a Project
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4" >
          {[
            { icon: Github,   href: "https://github.com/antokumar99",   label: "GitHub"   },
            { icon: Linkedin, href: "https://www.linkedin.com/in/anto-kumar-paul-92757a249/", label: "LinkedIn" },
            { icon: Twitter,  href: "https://twitter.com/antokumar99",  label: "Twitter"  },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 border border-void-700/50 rounded-sm flex items-center justify-center
                         text-void-500 hover:border-void-500 hover:text-void-300
                         hover:shadow-[0_0_16px_rgba(61,90,255,0.4)] transition-all"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                   text-void-600 hover:text-void-400 transition-colors animate-bounce"
      >
        <span className="label-tag">scroll</span>
        <ArrowDown size={13} />
      </a>
    </section>
  );
}

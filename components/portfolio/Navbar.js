"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";

const links = [
  { href: "#about",    label: "About"    },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills",   label: "Skills"   },
  { href: "#contact",  label: "Contact"  },
  
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void-950/90 backdrop-blur-lg border-b border-void-700/30 py-3"
          : "py-6"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-void-500 rounded-sm flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(61,90,255,0.7)] transition-all">
            <Terminal size={14} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            A.K<span className="text-void-400">.</span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="label-tag font-bold  text-void-300 hover:text-white  transition-colors "
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-primary text-xs py-2 px-4">
          Hire Me
        </a>

        <button
          className="md:hidden text-void-300 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-void-950/95 backdrop-blur-lg border-t border-void-700/30 px-6 py-5 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block label-tag text-void-300 hover:text-white transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-xs py-2 w-fit" onClick={() => setOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

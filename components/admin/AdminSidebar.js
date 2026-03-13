"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FolderOpen, Code2, MessageSquare, LogOut, ExternalLink, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/projects",  icon: FolderOpen,      label: "Projects"  },
  { href: "/admin/skills",    icon: Code2,           label: "Skills"    },
  { href: "/admin/messages",  icon: MessageSquare,   label: "Messages"  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 flex-col z-40 bg-void-950 border-r border-void-700/20">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-void-700/20">
        <div className="w-7 h-7 bg-void-500 rounded-sm flex items-center justify-center">
          <Terminal size={14} className="text-white" />
        </div>
        <span className="font-display font-extrabold text-white text-lg">
          A.K<span className="text-void-500">.</span>
        </span>
        <span className="label-tag text-void-700 ml-1">/ admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium transition-all",
                active
                  ? "bg-void-500 text-white shadow-[0_0_16px_rgba(61,90,255,0.4)]"
                  : "text-void-400 hover:text-white hover:bg-void-900/60"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-1 border-t border-void-700/20 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-void-500 hover:text-white hover:bg-void-900/40 rounded-sm transition-all"
        >
          <ExternalLink size={16} />
          View Portfolio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-void-500 hover:text-plasma-400 hover:bg-plasma-400/10 rounded-sm transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

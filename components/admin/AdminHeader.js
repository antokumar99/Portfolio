"use client";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const titles = {
  "/admin/dashboard": "Dashboard",
  "/admin/projects":  "Projects",
  "/admin/skills":    "Skills",
  "/admin/messages":  "Messages",
};

export function AdminHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const title = titles[pathname] ?? "Admin";

  return (
    <header className="h-16 bg-void-950/80 backdrop-blur-sm border-b border-void-700/20 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile nav */}
        <nav className="flex items-center gap-1 lg:hidden">
          {Object.entries(titles).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-xs label-tag text-void-500 hover:text-white transition-colors px-2 py-1"
            >
              {label}
            </Link>
          ))}
        </nav>
        <h1 className="font-display text-lg font-bold text-white hidden lg:block">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-void-900/60 border border-void-700/30 rounded-sm">
          <div className="w-6 h-6 bg-void-500 rounded-sm flex items-center justify-center flex-shrink-0">
            <User size={12} className="text-white" />
          </div>
          <span className="text-xs text-void-300 hidden sm:block font-mono">
            {session?.user?.email}
          </span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-1.5 label-tag text-void-600 hover:text-plasma-400 transition-colors"
        >
          <LogOut size={14} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}

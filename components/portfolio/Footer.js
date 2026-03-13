import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-void-700/20 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-void-500 rounded-sm flex items-center justify-center">
            <Terminal size={12} className="text-white" />
          </div>
          <span className="font-display font-bold text-white">
            A.K<span className="text-void-400">.</span>
          </span>
        </div>

        <p className="label-tag text-void-700">
          © {new Date().getFullYear()} Anto Kumar. All rights reserved.
        </p>

        <Link
          href="/login"
          className="label-tag text-void-800 hover:text-void-500 transition-colors"
        >
          Admin ↗
        </Link>
      </div>
    </footer>
  );
}

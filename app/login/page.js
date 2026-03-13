"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Terminal, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.ok) router.push("/admin/dashboard");
    else setError("Invalid credentials. Check your email and password.");
  };

  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(61,90,255,0.08) 0%, transparent 70%)" }}
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(61,90,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(61,90,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 bg-void-500 rounded-sm flex items-center justify-center group-hover:shadow-[0_0_24px_rgba(61,90,255,0.7)] transition-all">
              <Terminal size={22} className="text-white" />
            </div>
            <span className="font-display text-2xl font-extrabold text-white">
              A.K<span className="text-void-400">.</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-white mt-6 mb-2">
            Admin Access
          </h1>
          <p className="text-void-500 text-sm font-light">
            Authorised personnel only
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 glow-border">
          {/* Error */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-plasma-500/10 border border-plasma-500/30 rounded-sm">
              <AlertTriangle size={16} className="text-plasma-400 flex-shrink-0 mt-0.5" />
              <p className="text-plasma-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label-tag text-void-500 block mb-2">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-void-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@portfolio.dev"
                  className="w-full bg-void-950 border border-void-700/50 rounded-sm pl-10 pr-4 py-3
                             text-void-100 placeholder-void-800 focus:outline-none focus:border-void-500
                             transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label-tag text-void-500 block mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-void-600" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-void-950 border border-void-700/50 rounded-sm pl-10 pr-12 py-3
                             text-void-100 placeholder-void-800 focus:outline-none focus:border-void-500
                             transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-void-600 hover:text-void-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-void-800 text-center">
            <p className="label-tag text-void-700">
              Default: admin@portfolio.dev / Admin@123456
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="label-tag text-void-600 hover:text-void-300 transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

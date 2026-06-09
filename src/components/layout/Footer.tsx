"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCompareStore } from "@/store/compareStore";
import { GraduationCap, GitCompare, Bookmark, LogOut, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const compareList = useCompareStore((s) => s.compareList);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-sm group-hover:bg-indigo-700 transition-colors">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              EduFind<span className="text-indigo-600">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/colleges"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              Colleges
            </Link>

            <Link
              href="/compare"
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <GitCompare className="h-4 w-4" />
              Compare
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {compareList.length}
                </span>
              )}
            </Link>

            {session && (
              <Link
                href="/saved"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <Bookmark className="h-4 w-4" />
                Saved
              </Link>
            )}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <img
                  src={session.user?.image ?? "/placeholder.png"}
                  alt="avatar"
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-100"
                />
                <span className="text-sm text-slate-700 font-medium">{session.user?.name?.split(" ")[0]}</span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          <Link href="/colleges" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-lg" onClick={() => setMenuOpen(false)}>Colleges</Link>
          <Link href="/compare" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-lg" onClick={() => setMenuOpen(false)}>
            Compare {compareList.length > 0 && <span className="ml-1 text-indigo-600">({compareList.length})</span>}
          </Link>
          {session && <Link href="/saved" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 rounded-lg" onClick={() => setMenuOpen(false)}>Saved</Link>}
          <div className="pt-2 border-t border-slate-100">
            {session ? (
              <button onClick={() => signOut()} className="w-full text-left px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg">Sign out</button>
            ) : (
              <button onClick={() => signIn("google")} className="w-full text-left px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg">Sign in with Google</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

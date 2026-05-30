"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useCompareStore } from "@/store/compareStore";
import { LogIn, LogOut, Bookmark, GitCompare, Menu, X, BookOpen, Loader2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const compareCount = useCompareStore((state) => state.compareList.length);
  
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [email, setEmail] = useState("test@college.com");
  const [password, setPassword] = useState("password123");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setAuthError(res.error);
      } else {
        setShowAuthModal(false);
      }
    } catch (err) {
      setAuthError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Colleges", href: "/colleges" },
    { name: "Saved", href: "/saved", protected: true },
    { name: "Compare", href: "/compare" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass shadow-sm border-b border-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                <BookOpen className="h-6 w-6 text-accent" />
                <span>Edu<span className="text-accent">Match</span></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                // Skip protected links if not logged in
                if (link.protected && !session) return null;
                
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right-side items */}
            <div className="hidden md:flex items-center gap-4">
              {/* Compare cart button */}
              <Link href="/compare" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <GitCompare className="h-5 w-5" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white animate-pulse">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Saved shortcut if logged in */}
              {session && (
                <Link href="/saved" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Bookmark className="h-5 w-5" />
                </Link>
              )}

              {/* Auth state */}
              {status === "loading" ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : session ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-foreground leading-none">{session.user?.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">{session.user?.email}</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/95 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-4">
              <Link href="/compare" className="relative p-2 text-muted-foreground hover:text-primary">
                <GitCompare className="h-5 w-5" />
                {compareCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                    {compareCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted-foreground hover:text-primary"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden glass px-4 pt-2 pb-4 space-y-2 border-t border-muted animate-fadeInUp">
            {navLinks.map((link) => {
              if (link.protected && !session) return null;
              
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="border-t border-muted pt-4">
              {session ? (
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{session.user?.name}</span>
                    <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeInUp">
          <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-xl border border-border relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-foreground">Sign In to EduMatch</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Sign in to save colleges and view your bookmarks.
            </p>

            {authError && (
              <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                {authError}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="test@college.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password123"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="rounded-lg bg-secondary p-3 text-[11px] text-muted-foreground">
                <span className="font-semibold block mb-0.5">Mock Test Account:</span>
                <span>Email: <code className="bg-card px-1 py-0.5 rounded font-mono">test@college.com</code></span>
                <span className="block">Password: <code className="bg-card px-1 py-0.5 rounded font-mono">password123</code></span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow hover:bg-primary/95 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

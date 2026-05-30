import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto w-full py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg tracking-tight">
              <BookOpen className="h-5 w-5 text-accent" />
              <span>EduMatch</span>
            </Link>
            <p className="text-xs text-muted-foreground text-center md:text-left max-w-sm">
              Discover, compare, and save your dream colleges. Find the perfect match for your academic future.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/colleges" className="hover:text-primary transition-colors">Explore Colleges</Link>
            <Link href="/compare" className="hover:text-primary transition-colors">Compare Tool</Link>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} EduMatch Inc. All rights reserved. Built for future students.
          </p>
          <div className="flex gap-4 text-[11px] text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

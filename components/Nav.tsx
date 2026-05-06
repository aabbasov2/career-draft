"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Nav() {
  const [scrollY, setScrollY] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="transition-all duration-300"
        style={{
          backgroundColor: scrollY > 20 ? "rgba(10,12,16,0.75)" : "transparent",
          backdropFilter: scrollY > 20 ? "blur(14px)" : "none",
          borderBottom: scrollY > 20
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-7 h-7 rounded-md bg-emerald-400 flex items-center justify-center transition-transform group-hover:rotate-6">
                <span className="text-neutral-950 font-display font-bold text-sm leading-none">C</span>
              </div>
              <div className="absolute -inset-1 bg-emerald-400/30 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display font-medium text-[17px] tracking-tight">Career Draft</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13.5px] text-neutral-400">
            <Link
              href="/jobs"
              className={`transition-colors ${pathname === "/jobs" || pathname.startsWith("/jobs/") ? "text-neutral-100" : "hover:text-neutral-100"}`}
            >
              Jobs
            </Link>
            <Link href="/#how" className="hover:text-neutral-100 transition-colors">
              How it works
            </Link>
            <Link
              href="/companies"
              className={`transition-colors ${pathname === "/companies" ? "text-neutral-100" : "hover:text-neutral-100"}`}
            >
              Companies
            </Link>
            <Link
              href="/employers"
              className={`hover:text-neutral-100 transition-colors flex items-center gap-1 ${pathname === "/employers" ? "text-neutral-100" : ""}`}
            >
              For employers
              <ArrowRight className="w-3 h-3 opacity-50" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex items-center text-[13.5px] px-4 py-2 rounded-full hover:bg-white/5 text-neutral-300 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-1 text-[13.5px] px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors"
            >
              Sign up
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

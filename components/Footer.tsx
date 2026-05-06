import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md bg-emerald-400 flex items-center justify-center">
                <span className="text-neutral-950 font-display font-bold text-sm leading-none">C</span>
              </div>
              <div>
                <div className="font-display font-medium text-[15px]">Career Draft</div>
                <div className="font-mono-x text-[10.5px] text-neutral-500 uppercase tracking-wider">
                  Jobs, with your odds.
                </div>
              </div>
            </div>
            <p className="text-[13px] text-neutral-500 max-w-xs leading-relaxed">
              The job board for early-career talent — with AI match scores and resume feedback baked in.
            </p>
          </div>

          <div>
            <div className="font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-600 mb-3">
              Candidates
            </div>
            <div className="flex flex-col gap-2 text-[13.5px] text-neutral-400">
              <Link href="/jobs" className="hover:text-neutral-100 transition-colors">Browse jobs</Link>
              <Link href="/analyze" className="hover:text-neutral-100 transition-colors">Analyze CV</Link>
              <Link href="/companies" className="hover:text-neutral-100 transition-colors">Companies</Link>
              <Link href="#" className="hover:text-neutral-100 transition-colors">Resources</Link>
            </div>
          </div>

          <div>
            <div className="font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-600 mb-3">
              Company
            </div>
            <div className="flex flex-col gap-2 text-[13.5px] text-neutral-400">
              <Link href="#" className="hover:text-neutral-100 transition-colors">About</Link>
              <Link href="/employers" className="hover:text-neutral-100 transition-colors">For employers</Link>
              <Link href="#" className="hover:text-neutral-100 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-neutral-100 transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-neutral-500 font-mono-x">
          <div>© 2026 Career Draft. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span>1,240 jobs live · updated 4 min ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

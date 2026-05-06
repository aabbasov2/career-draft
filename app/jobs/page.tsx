"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search, MapPin, Building2, Clock, Zap, ArrowRight, SlidersHorizontal,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { jobs } from "@/lib/data";

const FILTERS = [
  { id: "all",       label: "All roles",    count: 6 },
  { id: "eng",       label: "Engineering",  count: 3 },
  { id: "design",    label: "Design",       count: 1 },
  { id: "marketing", label: "Marketing",    count: 1 },
  { id: "support",   label: "Support",      count: 1 },
];

const TYPES = ["Full-time", "Internship", "Part-time"];
const SORT_OPTIONS = ["Match score", "Newest", "Salary: High to low"];

export default function JobsPage() {
  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("Match score");
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  const toggleType = (t: string) =>
    setActiveTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const filtered = jobs.filter((j) => {
    const matchCat = activeFilter === "all" || j.category === activeFilter;
    const matchType = activeTypes.length === 0 || activeTypes.includes(j.type);
    const matchSearch =
      search === "" ||
      j.role.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchLocation =
      location === "" || j.location.toLowerCase().includes(location.toLowerCase());
    return matchCat && matchType && matchSearch && matchLocation;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Match score") return b.match - a.match;
    if (sort === "Salary: High to low") return 0;
    return 0;
  });

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      <Nav />

      {/* Search header */}
      <section className="relative pt-28 pb-8 border-b border-white/[0.05]">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pulse-dot" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            1,240 jobs live · updated 4 min ago
          </div>
          <h1 className="font-display font-light text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
            Browse jobs. <span className="italic text-neutral-400">See your match score.</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch gap-2 p-2 rounded-2xl bg-neutral-900/70 border border-white/[0.08] ring-soft max-w-3xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="w-4 h-4 text-neutral-500 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Role, company, or skill…"
                className="flex-1 bg-transparent outline-none text-[15px] text-neutral-100 placeholder:text-neutral-600"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 border-l border-white/[0.06]">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="bg-transparent outline-none text-[15px] text-neutral-100 placeholder:text-neutral-600 w-28"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-medium text-[14.5px] transition-all glow-emerald">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar filters */}
            <aside className="lg:w-56 shrink-0">
              <div className="space-y-6 lg:sticky lg:top-24">
                <div>
                  <div className="font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-600 mb-3">Category</div>
                  <div className="space-y-1">
                    {FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                          activeFilter === f.id
                            ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                            : "text-neutral-400 hover:text-neutral-100 hover:bg-white/[0.03]"
                        }`}
                      >
                        <span>{f.label}</span>
                        <span className="font-mono-x text-[11px] text-neutral-600">{f.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-600 mb-3">Job type</div>
                  <div className="space-y-2">
                    {TYPES.map((t) => (
                      <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          onClick={() => toggleType(t)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            activeTypes.includes(t)
                              ? "bg-emerald-400 border-emerald-400"
                              : "border-white/20 group-hover:border-white/40"
                          }`}
                        >
                          {activeTypes.includes(t) && (
                            <svg className="w-2.5 h-2.5 text-neutral-950" fill="none" viewBox="0 0 10 10">
                              <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[13.5px] text-neutral-400 group-hover:text-neutral-200 transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-600 mb-3">Sort by</div>
                  <div className="space-y-1">
                    {SORT_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSort(s)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                          sort === s
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "text-neutral-400 hover:text-neutral-100 hover:bg-white/[0.03]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Job cards */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[13.5px] text-neutral-500">
                  <span className="text-neutral-200 font-medium">{sorted.length}</span> roles found
                </div>
                <button className="sm:hidden flex items-center gap-1.5 text-[13px] text-neutral-400 px-3 py-1.5 rounded-lg border border-white/[0.06]">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                </button>
              </div>

              <div className="space-y-2.5">
                {sorted.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                    className="job-card group relative block p-5 lg:p-6 rounded-2xl bg-gradient-to-b from-white/[0.025] to-transparent border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 lg:gap-5">
                      <div className={`shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${job.logoColor} flex items-center justify-center text-neutral-900 font-display font-bold text-xl shadow-lg`}>
                        {job.logo}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h2 className="font-display text-xl lg:text-[22px] font-normal leading-tight tracking-tight">
                            {job.role}
                          </h2>
                          {job.hot && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-400/10 border border-rose-400/20 text-[10.5px] font-mono-x uppercase tracking-wider text-rose-300">
                              <Zap className="w-2.5 h-2.5" />Hot
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[14px] text-neutral-400">
                          <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                          <span>{job.company}</span>
                          <span className="text-neutral-700">·</span>
                          <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                          <span>{job.location}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11.5px] font-mono-x px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-neutral-400">{job.type}</span>
                          <span className="text-[11.5px] font-mono-x px-2 py-1 rounded-md bg-emerald-400/[0.06] border border-emerald-400/[0.15] text-emerald-300">{job.salary}</span>
                          {job.tags.map((t) => (
                            <span key={t} className="text-[11.5px] font-mono-x px-2 py-1 rounded-md bg-white/[0.02] border border-white/[0.05] text-neutral-500">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
                        <div className="match-pill flex items-center gap-2.5 transition-transform">
                          <div
                            className="match-ring relative w-10 h-10 rounded-full p-[3px]"
                            style={{ "--p": `${job.match}%` } as React.CSSProperties}
                          >
                            <div className="w-full h-full rounded-full bg-[#0D1015] flex items-center justify-center">
                              <span className="text-[11.5px] font-mono-x font-medium text-emerald-300">{job.match}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-mono-x uppercase tracking-wider text-neutral-500">Match</div>
                            <div className={`text-[11.5px] font-mono-x ${job.match >= 80 ? "text-emerald-400" : job.match >= 65 ? "text-amber-400" : "text-neutral-400"}`}>
                              {job.match >= 80 ? "Strong fit" : job.match >= 65 ? "Decent fit" : "Stretch"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[11.5px] font-mono-x text-neutral-500">
                          <Clock className="w-3 h-3" />
                          {job.posted}
                        </div>
                      </div>

                      <div className="md:hidden flex flex-col items-end shrink-0">
                        <div className={`text-2xl font-display font-light ${job.match >= 80 ? "text-emerald-300" : job.match >= 65 ? "text-amber-300" : "text-neutral-400"}`}>
                          {job.match}<span className="text-sm text-neutral-500">%</span>
                        </div>
                        <div className="text-[10px] font-mono-x uppercase tracking-wider text-neutral-500">match</div>
                      </div>
                    </div>

                    <div className="job-arrow absolute right-6 bottom-6 opacity-0 -translate-x-2 transition-all duration-300 hidden md:flex items-center gap-1.5 text-[12px] text-emerald-400">
                      <span className="font-mono-x">View role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>

              {sorted.length === 0 && (
                <div className="text-center py-16">
                  <div className="font-display text-2xl text-neutral-600 mb-2">No roles match your filters.</div>
                  <p className="text-neutral-500 text-[14px]">Try clearing some filters or broadening your search.</p>
                </div>
              )}

              {sorted.length > 0 && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[14px] text-neutral-200 transition-colors">
                    Load more jobs
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[12px] text-neutral-600 font-mono-x">
                    Showing {sorted.length} of 1,240 · Sign in to see your personal match scores
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

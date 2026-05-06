"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { companies } from "@/lib/data";

const ALL_TAGS = ["All", "Engineering", "Design", "Marketing", "Data", "Operations", "Customer Success"];

export default function CompaniesPage() {
  const [search, setSearch] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered = companies.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || c.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      <Nav />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(67,181,129,0.15) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3">
            ◆ Companies hiring now
          </div>
          <h1 className="font-display font-light text-5xl lg:text-6xl tracking-[-0.025em] leading-[1.0] mb-4">
            180+ companies.
            <br />
            <span className="italic text-neutral-400">All hiring early talent.</span>
          </h1>
          <p className="text-[16px] text-neutral-400 max-w-xl leading-relaxed mb-10">
            Every company on Career Draft is actively hiring for 0–3 year roles. Browse, follow companies, and get notified when they post.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies…"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[14.5px] text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-emerald-400/40 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {/* Tag filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] transition-all ${
                  activeTag === tag
                    ? "bg-emerald-400 text-neutral-950 font-medium"
                    : "bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-neutral-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Company grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((company) => (
              <Link
                key={company.name}
                href="/jobs"
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 block"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${company.gradient} flex items-center justify-center text-neutral-900 font-display font-bold text-xl shrink-0 shadow-lg`}
                  >
                    {company.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[19px] font-normal tracking-tight leading-tight">
                      {company.name}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[13px] text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{company.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {company.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-x text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                    <span className="font-mono-x text-[12px] text-emerald-400">
                      {company.openRoles} open role{company.openRoles !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="font-display text-2xl text-neutral-600 mb-2">No companies found.</div>
              <p className="text-neutral-500 text-[14px]">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

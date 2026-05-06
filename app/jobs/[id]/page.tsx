"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, MapPin, Building2, Clock, Zap, Check, Sparkles,
  Upload, ChevronRight, ArrowRight,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { jobs } from "@/lib/data";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cvUploaded, setCvUploaded] = useState<boolean>(false);

  const job = jobs.find((j) => j.id === id) ?? jobs[0];
  const related = jobs.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 2);

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-28 pb-24">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 font-mono-x mb-8">
          <Link href="/jobs" className="hover:text-neutral-200 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Jobs
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{job.company}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-300">{job.role}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Left — job content */}
          <div className="lg:col-span-3 space-y-10">

            {/* Job header */}
            <div>
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.logoColor} flex items-center justify-center text-neutral-900 font-display font-bold text-2xl shadow-lg shrink-0`}>
                  {job.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="font-display font-light text-3xl lg:text-4xl tracking-[-0.02em] leading-tight">
                      {job.role}
                    </h1>
                    {job.hot && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-400/10 border border-rose-400/20 text-[10.5px] font-mono-x uppercase tracking-wider text-rose-300">
                        <Zap className="w-2.5 h-2.5" />Hot
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-600" />
                      {job.posted}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="font-mono-x text-[12px] px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-neutral-300">{job.type}</span>
                <span className="font-mono-x text-[12px] px-3 py-1.5 rounded-lg bg-emerald-400/[0.08] border border-emerald-400/[0.2] text-emerald-300">{job.salary}</span>
                {job.tags.map((t) => (
                  <span key={t} className="font-mono-x text-[12px] px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-neutral-500">{t}</span>
                ))}
              </div>
            </div>

            {/* About the role */}
            <div>
              <h2 className="font-display text-2xl font-normal mb-4">About the role</h2>
              <p className="text-[15px] text-neutral-400 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div>
              <h2 className="font-display text-2xl font-normal mb-4">What you&apos;ll do</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-neutral-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="font-display text-2xl font-normal mb-4">What we&apos;re looking for</h2>
              <ul className="space-y-3">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            <div>
              <h2 className="font-display text-2xl font-normal mb-1">Nice to have</h2>
              <p className="text-[13px] text-neutral-600 font-mono-x mb-4">Not required, but gives you an edge.</p>
              <ul className="space-y-2.5">
                {job.niceToHave.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-neutral-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 shrink-0 mt-2.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* About company */}
            <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${job.logoColor} flex items-center justify-center text-neutral-900 font-display font-bold text-lg`}>
                  {job.logo}
                </div>
                <div>
                  <div className="font-display text-lg font-normal">{job.company}</div>
                  <div className="font-mono-x text-[11px] text-neutral-500 uppercase tracking-wider">About</div>
                </div>
              </div>
              <p className="text-[14.5px] text-neutral-400 leading-relaxed">{job.about}</p>
            </div>
          </div>

          {/* Right — sticky actions */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 space-y-4">

              {/* Match score card */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 ring-soft">
                <div className="font-mono-x text-[11px] uppercase tracking-wider text-neutral-600 mb-4">Your match score</div>
                <div className="flex items-center gap-5 mb-5">
                  <div
                    className="match-ring relative w-20 h-20 rounded-full p-[3.5px] shrink-0"
                    style={{ "--p": `${job.match}%` } as React.CSSProperties}
                  >
                    <div className="w-full h-full rounded-full bg-[#0D1015] flex flex-col items-center justify-center">
                      <span className={`text-2xl font-display font-light leading-none ${job.match >= 80 ? "text-emerald-300" : job.match >= 65 ? "text-amber-300" : "text-neutral-300"}`}>
                        {job.match}
                      </span>
                      <span className="text-[9px] font-mono-x text-neutral-500 uppercase mt-0.5">match</span>
                    </div>
                  </div>
                  <div>
                    <div className={`font-display text-xl mb-1 ${job.match >= 80 ? "text-emerald-300" : job.match >= 65 ? "text-amber-300" : "text-neutral-300"}`}>
                      {job.match >= 80 ? "Strong fit" : job.match >= 65 ? "Decent fit" : "Stretch role"}
                    </div>
                    <p className="text-[13px] text-neutral-500 leading-snug">
                      {job.match >= 80
                        ? "You match well. Apply with confidence."
                        : job.match >= 65
                        ? "A few gaps — fixable before you apply."
                        : "Ambitious pick. Worth a strong cover letter."}
                    </p>
                  </div>
                </div>

                {/* Upload CTA */}
                {!cvUploaded ? (
                  <button
                    onClick={() => setCvUploaded(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[13.5px] text-neutral-300 transition-colors mb-3"
                  >
                    <Upload className="w-4 h-4 text-neutral-400" />
                    Upload your CV to see real score
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20 text-[13.5px] text-emerald-300 mb-3">
                    <Check className="w-4 h-4" />
                    CV uploaded · score calculated
                  </div>
                )}

                <Link
                  href="/sign-up"
                  className="cta-btn group w-full relative overflow-hidden flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-medium text-[14.5px] transition-all glow-emerald"
                >
                  <span className="relative z-10">Apply now</span>
                  <ArrowRight className="cta-arrow w-4 h-4 relative z-10 transition-transform" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </div>

              {/* Analyze with AI */}
              <Link
                href="/analyze"
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[13.5px] text-neutral-200 font-medium">Get resume feedback</div>
                  <div className="text-[12px] text-neutral-500 font-mono-x">Analyze + rewrite for this role</div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Job meta */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                {[
                  { label: "Company", value: job.company },
                  { label: "Location", value: job.location },
                  { label: "Type",     value: job.type },
                  { label: "Salary",   value: job.salary },
                  { label: "Posted",   value: job.posted },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-[13px]">
                    <span className="font-mono-x text-[11.5px] uppercase tracking-wider text-neutral-600">{label}</span>
                    <span className="text-neutral-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related roles */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/[0.05]">
            <h2 className="font-display font-light text-3xl tracking-tight mb-6">
              More roles you might like
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/jobs/${r.id}`}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.logoColor} flex items-center justify-center text-neutral-900 font-display font-bold text-lg shrink-0`}>
                    {r.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[18px] font-normal leading-tight mb-1">{r.role}</div>
                    <div className="text-[13px] text-neutral-500">{r.company} · {r.location}</div>
                    <div className={`font-mono-x text-[12px] mt-2 ${r.match >= 80 ? "text-emerald-400" : r.match >= 65 ? "text-amber-400" : "text-neutral-500"}`}>
                      {r.match}% match
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

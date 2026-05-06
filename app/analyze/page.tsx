"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload, FileText, Sparkles, Check, ArrowRight, X, Wand2, Flame, Target,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Step = "input" | "results";

export default function AnalyzePage() {
  const [step, setStep] = useState<Step>("input");
  const [jobText, setJobText] = useState<string>("");
  const [cvUploaded, setCvUploaded] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const canAnalyze = jobText.trim().length > 0 && cvUploaded;

  const handleAnalyze = () => {
    if (!canAnalyze) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep("results");
    }, 1800);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      <Nav />

      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, rgba(67,181,129,0.18) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3">
            ◆ CV Analyzer
          </div>
          <h1 className="font-display font-light text-5xl lg:text-6xl tracking-[-0.025em] leading-[1.0] mb-4">
            Test your CV against
            <br />
            <span className="italic text-neutral-400">any role.</span>
          </h1>
          <p className="text-[16px] text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Paste a job description, upload your CV, and get an instant match score with feedback on exactly what to fix.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          {step === "input" && (
            <div className="space-y-4">
              {/* Job description */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
                  <div className="w-7 h-7 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
                    <span className="font-mono-x text-[12px] font-medium text-neutral-950">1</span>
                  </div>
                  <span className="font-display text-[18px]">Paste the job description</span>
                  <span className="ml-auto font-mono-x text-[11px] text-neutral-600 uppercase tracking-wider">or URL</span>
                </div>
                <div className="p-2">
                  <textarea
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    placeholder="Paste the job description here, or drop in a URL like https://linear.app/jobs/..."
                    rows={6}
                    className="w-full px-4 py-3 bg-transparent text-[14.5px] text-neutral-300 placeholder:text-neutral-600 outline-none resize-none leading-relaxed"
                  />
                </div>
                {jobText && (
                  <div className="px-5 pb-4 flex items-center gap-2 text-[12.5px] text-neutral-500 font-mono-x">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    {jobText.split(/\s+/).filter(Boolean).length} words · ready to analyze
                  </div>
                )}
              </div>

              {/* CV upload */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${cvUploaded ? "bg-emerald-400" : "bg-white/[0.06] border border-white/[0.1]"}`}>
                    <span className="font-mono-x text-[12px] font-medium text-neutral-950">2</span>
                  </div>
                  <span className="font-display text-[18px]">Upload your CV</span>
                  <span className="ml-auto font-mono-x text-[11px] text-neutral-600 uppercase tracking-wider">PDF or DOCX</span>
                </div>
                <div className="p-5">
                  {cvUploaded ? (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20">
                      <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="flex-1">
                        <div className="text-[14px] text-emerald-300">aziz_cv_v3.pdf</div>
                        <div className="font-mono-x text-[11.5px] text-neutral-500">2 pages · uploaded</div>
                      </div>
                      <button
                        onClick={() => setCvUploaded(false)}
                        className="text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCvUploaded(true)}
                      className="w-full flex flex-col items-center gap-3 px-6 py-8 rounded-xl border border-dashed border-white/[0.1] hover:border-emerald-400/30 hover:bg-emerald-400/[0.02] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-emerald-400/20 transition-colors">
                        <Upload className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <div className="text-center">
                        <div className="text-[14px] text-neutral-300 mb-0.5">Drop your CV here or click to browse</div>
                        <div className="font-mono-x text-[12px] text-neutral-600">PDF, DOCX — max 5 MB</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Analyze button */}
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className={`w-full relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-[15px] transition-all ${
                  canAnalyze && !isAnalyzing
                    ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 glow-emerald"
                    : "bg-white/[0.04] text-neutral-600 border border-white/[0.06] cursor-not-allowed"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-neutral-950/30 border-t-neutral-950 animate-spin" />
                    Analyzing fit…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analyze my CV
                  </>
                )}
              </button>

              <p className="text-center font-mono-x text-[12px] text-neutral-600">
                First 3 analyses free · No account required
              </p>
            </div>
          )}

          {step === "results" && (
            <div className="space-y-5">
              {/* Score header */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6">
                <div className="flex items-center gap-6">
                  <div
                    className="match-ring relative w-24 h-24 rounded-full p-[4px] shrink-0"
                    style={{ "--p": "62%" } as React.CSSProperties}
                  >
                    <div className="w-full h-full rounded-full bg-[#0D1015] flex flex-col items-center justify-center">
                      <span className="text-3xl font-display font-light text-amber-300 leading-none">62</span>
                      <span className="font-mono-x text-[9px] text-neutral-500 uppercase mt-1">match</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl mb-1 text-amber-300">Stretch fit</div>
                    <p className="text-[14px] text-neutral-400 leading-relaxed max-w-sm">
                      You have a solid foundation, but 3 specific gaps are holding your score back. Fix them and you could hit 85%+.
                    </p>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Skills match",     score: 72, color: "emerald" },
                  { label: "Experience level", score: 65, color: "amber" },
                  { label: "Keywords",         score: 48, color: "rose" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="font-mono-x text-[11px] uppercase tracking-wider text-neutral-600 mb-2">{item.label}</div>
                    <div className={`font-display text-3xl font-light mb-2 ${item.color === "emerald" ? "text-emerald-300" : item.color === "amber" ? "text-amber-300" : "text-rose-300"}`}>
                      {item.score}%
                    </div>
                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color === "emerald" ? "bg-emerald-400" : item.color === "amber" ? "bg-amber-400" : "bg-rose-400"}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* What to fix */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.05]">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span className="font-display text-[18px]">What to fix</span>
                  <span className="ml-auto font-mono-x text-[11px] text-rose-400/80 uppercase tracking-wider">3 issues</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {[
                    { issue: "Missing keywords: TypeScript, system design, REST APIs", severity: "high" },
                    { issue: "3 bullet points have no measurable outcome — add numbers", severity: "high" },
                    { issue: "Experience described in passive voice — rewrite to active", severity: "medium" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-4 text-[14px]">
                      <span className={`font-mono-x text-[11px] px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${
                        item.severity === "high"
                          ? "bg-rose-500/[0.1] border border-rose-500/20 text-rose-400"
                          : "bg-amber-500/[0.1] border border-amber-500/20 text-amber-400"
                      }`}>
                        {item.severity}
                      </span>
                      <span className="text-neutral-300">{item.issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI rewrite preview */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.05]">
                  <Wand2 className="w-4 h-4 text-sky-400" />
                  <span className="font-display text-[18px]">AI rewrite preview</span>
                </div>
                <div className="p-5 space-y-3 font-mono-x text-[13px]">
                  <div className="text-neutral-500 line-through decoration-rose-400/40">
                    Helped team with various development tasks and supported senior engineers
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <div className="h-px flex-1 bg-white/[0.05]" />
                    <span>↓ rewritten</span>
                    <div className="h-px flex-1 bg-white/[0.05]" />
                  </div>
                  <div className="text-emerald-300 leading-relaxed">
                    Built 4 TypeScript components used across the checkout flow, reducing load time by 18% and eliminating 3 recurring bugs flagged in production
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/sign-up"
                  className="cta-btn group flex-1 relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-medium text-[14.5px] transition-all glow-emerald"
                >
                  <span className="relative z-10">Get full rewrite + apply pack</span>
                  <ArrowRight className="cta-arrow w-4 h-4 relative z-10 transition-transform" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
                <button
                  onClick={() => { setStep("input"); setCvUploaded(false); setJobText(""); }}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[14px] text-neutral-300 transition-colors"
                >
                  <Target className="w-4 h-4" />
                  Analyze another role
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

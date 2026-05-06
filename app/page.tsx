"use client";

import React, { useState, useRef } from "react";
import {
  Upload, Sparkles, FileText, X, ArrowRight, Lock, Check,
  AlertCircle, RotateCcw,
} from "lucide-react";

interface AnalysisResult {
  matchScore: number;
  missingKeywords: string[];
  feedback: string[];
  improvedCV: string;
}

type Step = "idle" | "analyzing" | "done" | "error";

function scoreColor(s: number) {
  if (s >= 75) return "text-emerald-400";
  if (s >= 50) return "text-amber-400";
  return "text-rose-400";
}
function scoreBarColor(s: number) {
  if (s >= 75) return "bg-emerald-400";
  if (s >= 50) return "bg-amber-400";
  return "bg-rose-400";
}
function scoreLabel(s: number) {
  if (s >= 75) return "Strong match";
  if (s >= 50) return "Decent match — fixable gaps";
  return "Weak match";
}

function ResumeContent({ text }: { text: string }) {
  return (
    <div className="px-6 py-5 space-y-[3px]">
      {text.split("\n").map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-2" />;

        // Section header: all-caps line (e.g. WORK EXPERIENCE, SKILLS)
        if (/^[A-Z][A-Z\s&/\-]{2,}$/.test(t)) {
          return (
            <div key={i} className="pt-5 pb-2 first:pt-0">
              <p className="font-mono-x text-[10.5px] uppercase tracking-[0.2em] text-emerald-400 pb-2 border-b border-white/[0.07]">
                {t}
              </p>
            </div>
          );
        }

        // Bullet point
        if (/^[•\-–*]/.test(t)) {
          return (
            <div key={i} className="flex gap-2.5 pl-1 py-[2px]">
              <span className="text-emerald-400/50 shrink-0 mt-[6px] text-[7px]">▸</span>
              <span className="text-[13.5px] text-neutral-300 leading-relaxed">
                {t.replace(/^[•\-–*]\s*/, "")}
              </span>
            </div>
          );
        }

        // Contact line (has | separator or @ for email)
        if (t.includes(" | ") || (t.includes("@") && t.length < 120)) {
          return (
            <p key={i} className="font-mono-x text-[11.5px] text-neutral-500 leading-relaxed">
              {t}
            </p>
          );
        }

        // Company — Role line
        if (t.includes(" — ")) {
          return (
            <p key={i} className="text-[14px] font-medium text-neutral-100 leading-snug mt-3 first:mt-0">
              {t}
            </p>
          );
        }

        // Date line (short line with a year)
        if (/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present|\d{4})\b/.test(t) && t.length < 40) {
          return (
            <p key={i} className="font-mono-x text-[11px] text-neutral-600 -mt-0.5 mb-1">
              {t}
            </p>
          );
        }

        // Name line heuristic: short, no punctuation, near top — rendered large
        if (i < 4 && t.length < 50 && !/[|@•\-]/.test(t) && t === t.replace(/[^a-zA-Z\s'-]/, "")) {
          return (
            <p key={i} className="font-display text-[22px] font-light tracking-tight text-white">
              {t}
            </p>
          );
        }

        // Default paragraph
        return (
          <p key={i} className="text-[13.5px] text-neutral-400 leading-relaxed">
            {t}
          </p>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("idle");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [unlocked, setUnlocked] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const canSubmit = jobDescription.trim().length > 30 && cvFile !== null;

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10 MB.");
      return;
    }
    setError("");
    setCvFile(file);
  };

  const handleAnalyze = async () => {
    if (!canSubmit || step === "analyzing") return;

    setStep("analyzing");
    setError("");
    setResults(null);
    setUnlocked(false);

    try {
      const body = new FormData();
      body.append("jobDescription", jobDescription);
      body.append("cv", cvFile!);

      const res = await fetch("/api/analyze", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Analysis failed.");

      setResults(data);
      setStep("done");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setStep("error");
    }
  };

  const reset = () => {
    setStep("idle");
    setResults(null);
    setJobDescription("");
    setCvFile(null);
    setUnlocked(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Split improved CV: first 30% visible, rest paywalled
  const splitCV = (cv: string) => {
    const lines = cv.split("\n").filter((l) => l.trim() !== "");
    const cutoff = Math.max(3, Math.floor(lines.length * 0.30));
    return {
      preview: lines.slice(0, cutoff).join("\n"),
      locked: lines.slice(cutoff).join("\n"),
    };
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 border-b border-white/[0.06]"
        style={{ background: "rgba(10,12,16,0.85)", backdropFilter: "blur(14px)" }}
      >
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-400 flex items-center justify-center">
              <span className="font-display font-bold text-[13px] text-neutral-950 leading-none">C</span>
            </div>
            <span className="font-display font-medium text-[16px] tracking-tight">Career Draft</span>
          </div>
          <span className="font-mono-x text-[10.5px] uppercase tracking-widest text-neutral-600">
            Beta · MVP
          </span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-2xl mx-auto px-5 py-14 lg:py-20">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] font-mono-x text-[11.5px] text-neutral-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            AI-powered CV analysis
          </div>
          <h1 className="font-display font-light text-[46px] sm:text-6xl tracking-[-0.025em] leading-[0.97] mb-4">
            Know your odds
            <br />
            <span className="italic text-neutral-400">before you apply.</span>
          </h1>
          <p className="text-[15.5px] text-neutral-500 leading-relaxed max-w-sm mx-auto">
            Paste a job description. Upload your CV. Get a match score, a roast, and a rewritten resume — in seconds.
          </p>
        </div>

        {/* ── Input form ── */}
        <div className="space-y-3">

          {/* Step 1 — Job description */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.05]">
              <span className="w-5 h-5 rounded-full bg-emerald-400/15 border border-emerald-400/25 font-mono-x text-[10px] text-emerald-400 flex items-center justify-center shrink-0">
                1
              </span>
              <span className="text-[13.5px] text-neutral-300 font-medium">Job description</span>
              <span className="ml-auto font-mono-x text-[11px] text-neutral-600">paste text or URL</span>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder={"Paste the full job description here…\n\nExample: \"We're looking for a Junior Frontend Engineer with 1–2 years of React and TypeScript experience...\""}
              rows={7}
              className="w-full px-5 py-4 bg-transparent text-[14px] text-neutral-300 placeholder:text-neutral-600 outline-none resize-none leading-relaxed"
            />
            {jobDescription.length > 0 && (
              <div className="px-5 pb-3 font-mono-x text-[11px] text-neutral-600">
                {jobDescription.trim().split(/\s+/).length} words
              </div>
            )}
          </div>

          {/* Step 2 — CV upload */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.05]">
              <span className={`w-5 h-5 rounded-full font-mono-x text-[10px] flex items-center justify-center shrink-0 transition-colors ${cvFile ? "bg-emerald-400 border-emerald-400 text-neutral-950" : "bg-emerald-400/15 border border-emerald-400/25 text-emerald-400"}`}>
                {cvFile ? <Check className="w-2.5 h-2.5" /> : "2"}
              </span>
              <span className="text-[13.5px] text-neutral-300 font-medium">Your CV</span>
              <span className="ml-auto font-mono-x text-[11px] text-neutral-600">PDF · max 10 MB</span>
            </div>
            <div className="p-3">
              {cvFile ? (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20">
                  <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-emerald-300 truncate">{cvFile.name}</div>
                    <div className="font-mono-x text-[11px] text-neutral-500 mt-0.5">
                      {(cvFile.size / 1024).toFixed(0)} KB · PDF
                    </div>
                  </div>
                  <button
                    onClick={() => setCvFile(null)}
                    className="text-neutral-500 hover:text-neutral-200 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFile(e.dataTransfer.files[0] ?? null);
                  }}
                  className={`w-full flex flex-col items-center gap-3 py-8 rounded-xl border border-dashed transition-all ${
                    isDragging
                      ? "border-emerald-400/50 bg-emerald-400/[0.04]"
                      : "border-white/[0.09] hover:border-emerald-400/30 hover:bg-emerald-400/[0.02]"
                  }`}
                >
                  <Upload className={`w-6 h-6 transition-colors ${isDragging ? "text-emerald-400" : "text-neutral-500"}`} />
                  <div className="text-center">
                    <div className="text-[14px] text-neutral-300 mb-0.5">
                      Drop your CV here, or click to browse
                    </div>
                    <div className="font-mono-x text-[11.5px] text-neutral-600">Text-based PDF only (not scanned images)</div>
                  </div>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {/* Error */}
          {(step === "error" || error) && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-500/[0.08] border border-rose-500/20 text-[13.5px] text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error || "Something went wrong. Check your .env.local and try again."}</span>
            </div>
          )}

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={!canSubmit || step === "analyzing"}
            className={`w-full relative overflow-hidden flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-medium text-[15px] transition-all duration-200 ${
              canSubmit && step !== "analyzing"
                ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 glow-emerald"
                : "bg-white/[0.04] text-neutral-600 border border-white/[0.06] cursor-not-allowed"
            }`}
          >
            {step === "analyzing" ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-neutral-950/30 border-t-neutral-950 animate-spin" />
                Analyzing your chances…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze My Chances
              </>
            )}
          </button>

          {step === "analyzing" && (
            <p className="text-center font-mono-x text-[11.5px] text-neutral-600">
              Reading your CV · comparing against JD · generating feedback…
            </p>
          )}
        </div>

        {/* ── Results ── */}
        {step === "done" && results && (
          <div ref={resultsRef} className="mt-14 space-y-4">

            {/* Section label */}
            <div className="flex items-center gap-2 font-mono-x text-[11px] uppercase tracking-[0.18em] text-emerald-400/80 mb-6">
              <Check className="w-3.5 h-3.5" />
              Analysis complete
            </div>

            {/* ── Match score ── */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
              <div className="font-mono-x text-[11px] uppercase tracking-wider text-neutral-600 mb-4">
                Match score
              </div>
              <div className={`font-display leading-none mb-2 ${scoreColor(results.matchScore)}`}>
                <span className="text-[88px] font-light">{results.matchScore}</span>
                <span className="text-4xl text-neutral-600">%</span>
              </div>
              <div className={`font-mono-x text-[12.5px] uppercase tracking-wider mb-5 ${scoreColor(results.matchScore)}`}>
                {scoreLabel(results.matchScore)}
              </div>
              {/* Bar */}
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${scoreBarColor(results.matchScore)}`}
                  style={{ width: `${results.matchScore}%` }}
                />
              </div>
            </div>

            {/* ── Missing keywords ── */}
            {results.missingKeywords?.length > 0 && (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <div className="font-mono-x text-[11px] uppercase tracking-wider text-neutral-600 mb-4">
                  Missing from your CV
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/[0.08] border border-rose-500/20 font-mono-x text-[12.5px] text-rose-300"
                    >
                      <X className="w-3 h-3 shrink-0" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Feedback / Roast ── */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.05]">
                <span className="text-[18px]">🔥</span>
                <span className="font-display text-[19px] font-normal">What&apos;s hurting your chances</span>
              </div>
              <ol className="divide-y divide-white/[0.04]">
                {results.feedback.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 px-6 py-4">
                    <span className="font-mono-x text-[11px] text-neutral-700 shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14.5px] text-neutral-300 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* ── Improved CV + paywall ── */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">✨</span>
                  <span className="font-display text-[19px] font-normal">Your improved resume</span>
                </div>
                {unlocked && (
                  <span className="font-mono-x text-[11px] text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                    <Check className="w-3 h-3" /> Unlocked
                  </span>
                )}
              </div>

              {(() => {
                const { preview, locked } = splitCV(results.improvedCV);
                return (
                  <>
                    {/* Visible preview — always shown */}
                    <ResumeContent text={preview} />

                    {/* Locked section */}
                    {!unlocked && locked && (
                      <div className="relative">
                        {/* Blurred text */}
                        <div
                          aria-hidden
                          className="blur-sm select-none pointer-events-none opacity-50 max-h-36 overflow-hidden"
                        >
                          <ResumeContent text={locked} />
                        </div>

                        {/* Fade gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1015]/10 via-[#0D1015]/70 to-[#0D1015]" />

                        {/* Paywall card */}
                        <div className="relative px-6 pb-8 pt-4 flex flex-col items-center text-center gap-4">
                          <div>
                            <Lock className="w-5 h-5 text-neutral-500 mx-auto mb-2" />
                            <div className="font-display text-[22px] font-normal mb-1">
                              See the full rewrite
                            </div>
                            <p className="font-mono-x text-[12.5px] text-neutral-500">
                              Tailored to this exact job. Copy-paste ready.
                            </p>
                          </div>
                          <button
                            onClick={() => setUnlocked(true)}
                            className="cta-btn group relative overflow-hidden flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-medium text-[15px] transition-all glow-emerald"
                          >
                            <span className="relative z-10">Unlock Full Resume — €5</span>
                            <ArrowRight className="cta-arrow w-4 h-4 relative z-10 transition-transform" />
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          </button>
                          <span className="font-mono-x text-[11px] text-neutral-600 flex items-center gap-1.5">
                            <Lock className="w-3 h-3" />
                            Simulated — no real payment
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Full CV after unlock */}
                    {unlocked && locked && (
                      <ResumeContent text={locked} />
                    )}
                  </>
                );
              })()}
            </div>

            {/* Analyze another */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 text-[13.5px] text-neutral-500 hover:text-neutral-200 transition-colors font-mono-x"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Analyze another role
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-6 text-center font-mono-x text-[11.5px] text-neutral-700">
        Career Draft · MVP Beta · 2026
      </footer>
    </div>
  );
}

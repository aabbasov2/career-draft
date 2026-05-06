"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Target, Zap, BarChart3, Check, ChevronDown, Users, Clock, TrendingUp,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const FAQS = [
  {
    q: "How does AI matching work?",
    a: "We parse your job description and score every candidate's CV against it in real time. Candidates see their match score before applying, so you only hear from people who have already reviewed the gap.",
  },
  {
    q: "Who is Career Draft for?",
    a: "Companies hiring for 0–3 year roles — internships, junior positions, associate-level. If you're hiring for senior roles only, we're probably not the right fit yet.",
  },
  {
    q: "Can I post for free?",
    a: "Yes. The Free plan lets you post up to 3 active roles and see applicants' match scores. Upgrade to Pro for unlimited postings, the full talent pool, and analytics.",
  },
  {
    q: "How long until I see applicants?",
    a: "Most job posts see their first applicants within 4 hours. We have 10,000+ active candidates browsing daily.",
  },
  {
    q: "Can I search the talent pool proactively?",
    a: "On the Pro and Enterprise plans, yes. You can filter by skills, experience level, location, and availability.",
  },
];

export default function EmployersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, rgba(67,181,129,0.18) 0%, transparent 60%)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-4">
              ◆ For employers
            </div>
            <h1 className="font-display font-light text-5xl lg:text-7xl tracking-[-0.025em] leading-[0.98] mb-6">
              Hire early talent.
              <br />
              <span className="italic text-emerald-400">Pre-qualified.</span>
            </h1>
            <p className="text-[17px] text-neutral-400 leading-relaxed max-w-2xl mb-8">
              Career Draft candidates come pre-scored against your job description. No more sifting through CVs that don&apos;t match — every applicant has already seen their fit score and chosen to apply anyway.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#post"
                className="cta-btn group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-medium text-[15px] transition-all glow-emerald"
              >
                <span className="relative z-10">Post a job free</span>
                <ArrowRight className="cta-arrow w-4 h-4 relative z-10 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[14.5px] text-neutral-200 transition-colors"
              >
                See example listing
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.06] max-w-2xl">
            {[
              { num: "10k+",  label: "Active candidates" },
              { num: "4h",    label: "Avg. first applicant" },
              { num: "3.2×",  label: "Hire rate vs job boards" },
            ].map((s) => (
              <div key={s.label} className="bg-[#0D1015] px-5 py-5 text-center">
                <div className="font-display text-3xl font-light tracking-tight text-emerald-300">{s.num}</div>
                <div className="font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3">◆ How it works</div>
            <h2 className="font-display font-light text-4xl lg:text-5xl tracking-[-0.02em]">
              Three steps.{" "}
              <span className="italic text-neutral-400">Start hiring today.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.06]">
            {[
              { num: "01", title: "Post your role", body: "Write your job description — or paste from LinkedIn/Greenhouse. We handle formatting and publish it in minutes.", icon: <Zap className="w-5 h-5" /> },
              { num: "02", title: "AI scores every candidate", body: "Every Career Draft candidate gets a match score for your role before they apply. They see the gaps. You see motivated applicants.", icon: <Target className="w-5 h-5" /> },
              { num: "03", title: "Review and hire", body: "Get ranked applicants with AI-summarised CVs, match scores, and red flags flagged automatically. Invite to interview in one click.", icon: <BarChart3 className="w-5 h-5" /> },
            ].map((step, i) => (
              <div key={i} className="group relative bg-[#0D1015] p-8 lg:p-10 hover:bg-[#10141a] transition-colors duration-500">
                <div className="flex items-start justify-between mb-12">
                  <div className="font-display text-5xl font-light text-neutral-700 group-hover:text-emerald-400/40 transition-colors duration-500">{step.num}</div>
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-400/20 transition-all">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-normal mb-3 leading-tight">{step.title}</h3>
                <p className="text-[14.5px] text-neutral-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3">◆ Why Career Draft</div>
            <h2 className="font-display font-light text-4xl lg:text-5xl tracking-[-0.02em] max-w-2xl mx-auto">
              Less noise.{" "}
              <span className="italic text-neutral-400">Better signal.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Target className="w-5 h-5" />,
                title: "Pre-scored applicants",
                body: "Every CV is scored against your JD before you see it. Sort your inbox by match score instead of guessing.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "10k+ active candidates",
                body: "Students and 0–3 year professionals actively looking. Not just passive LinkedIn members.",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: "Fast time to hire",
                body: "Average first qualified applicant in under 4 hours. Most roles are filled within 2 weeks.",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "AI-summarised CVs",
                body: "Each applicant's CV is auto-summarised for your JD. Scan 50 applicants in the time it takes to read 5.",
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Applicant analytics",
                body: "See who viewed your listing, what match scores look like across your pipeline, and where drop-off happens.",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "Talent pool access",
                body: "On Pro, proactively search candidates by skills, experience, and location. Source before they apply.",
              },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] hover:border-white/[0.1] transition-all">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-emerald-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-normal mb-2 leading-tight">{f.title}</h3>
                <p className="text-[14px] text-neutral-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3">◆ Pricing</div>
            <h2 className="font-display font-light text-4xl lg:text-5xl tracking-[-0.02em]">
              Simple pricing.{" "}
              <span className="italic text-neutral-400">Start free.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Free",
                price: "€0",
                period: "forever",
                description: "Try it out before committing.",
                features: ["3 active job posts", "Applicant match scores", "Basic applicant list", "Email support"],
                cta: "Get started",
                highlight: false,
              },
              {
                name: "Pro",
                price: "€99",
                period: "per month",
                description: "For teams hiring regularly.",
                features: ["Unlimited job posts", "Full talent pool search", "AI CV summaries", "Applicant analytics dashboard", "Priority listing placement", "Slack integration"],
                cta: "Start free trial",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "contact us",
                description: "For high-volume hiring teams.",
                features: ["Everything in Pro", "Dedicated account manager", "Custom integrations (ATS)", "Volume discounts", "SLA + priority support", "Team seats"],
                cta: "Talk to sales",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-7 rounded-2xl border transition-all ${
                  plan.highlight
                    ? "bg-emerald-400/[0.04] border-emerald-400/30"
                    : "bg-white/[0.02] border-white/[0.07]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-400 font-mono-x text-[10.5px] uppercase tracking-wider text-neutral-950 font-medium">
                    Most popular
                  </div>
                )}
                <div className="mb-5">
                  <div className="font-mono-x text-[11px] uppercase tracking-wider text-neutral-600 mb-2">{plan.name}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-light">{plan.price}</span>
                    <span className="font-mono-x text-[12px] text-neutral-600">{plan.period}</span>
                  </div>
                  <p className="text-[13.5px] text-neutral-500 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-[14px] transition-all ${
                    plan.highlight
                      ? "bg-emerald-400 hover:bg-emerald-300 text-neutral-950 glow-emerald"
                      : "bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-neutral-200"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-3">◆ FAQ</div>
            <h2 className="font-display font-light text-4xl tracking-[-0.02em]">Common questions</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-display text-[17px] font-normal">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[14.5px] text-neutral-400 leading-relaxed border-t border-white/[0.04]">
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA form */}
      <section id="post" className="py-24 border-t border-white/[0.05] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(67,181,129,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-lg mx-auto px-6 lg:px-10 text-center">
          <div className="font-mono-x text-[11.5px] uppercase tracking-[0.18em] text-emerald-400/80 mb-4">◆ Get started</div>
          <h2 className="font-display font-light text-4xl lg:text-5xl tracking-[-0.025em] mb-4">
            Post your first role.
            <br />
            <span className="italic text-emerald-400">Free, today.</span>
          </h2>
          <p className="text-[15px] text-neutral-400 mb-8">No credit card. No setup fee. Live in under 5 minutes.</p>
          <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 ring-soft space-y-3">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-[14.5px] text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-emerald-400/40 transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-[14.5px] text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-emerald-400/40 transition-colors"
            />
            <button className="cta-btn group w-full relative overflow-hidden flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-medium text-[14.5px] transition-all glow-emerald">
              <span className="relative z-10">Post a job free</span>
              <ArrowRight className="cta-arrow w-4 h-4 relative z-10 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

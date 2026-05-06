import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a brutally honest career advisor who has reviewed thousands of CVs. You give direct, specific feedback without corporate fluff or false encouragement. You identify exactly why a CV falls short for a specific role.

You ALWAYS respond with valid JSON only — no markdown fences, no explanation, no text outside the JSON object.`;

function buildPrompt(jobDescription: string, cvText: string): string {
  return `${SYSTEM_PROMPT}

Analyze this CV against the job description below. Be brutal and specific — reference exact lines or sections from the CV.

Return ONLY valid JSON in this exact format:
{
  "matchScore": <integer 0-100>,
  "missingKeywords": [<string>, ...],
  "feedback": [<string>, ...],
  "improvedCV": "<full rewritten CV as plain text with newlines as \\n>"
}

SCORING RULES (be realistic, not generous):
- 0-39: Candidate is missing core required skills — applying would waste everyone's time
- 40-59: Some relevant experience but significant gaps exist
- 60-74: Decent fit but specific fixable issues are holding them back
- 75-89: Strong candidate with minor gaps
- 90-100: Near-perfect fit (rare — only if CV reads like it was written for this exact role)

MISSING KEYWORDS:
- List exact skills, tools, technologies, and qualifications from the JD that are absent or buried in the CV
- Be specific: "React" not "frontend frameworks"
- Maximum 10 items

FEEDBACK RULES:
- 3 to 5 points maximum
- Each point must reference something specific in the CV — not generic advice
- Use a direct, roast-style tone — like a brutally honest mentor
- Good examples:
  "Your bullet points are vague and impact-free — 'responsible for social media' tells a recruiter nothing about what you actually achieved"
  "You list Python as a skill but there is zero evidence of it in your experience section — a red flag for any technical reviewer"
  "The experience section reads like a job description, not an achievement record — no numbers, no scope, no outcomes anywhere"
- Do NOT say things like "Consider adding..." or "You might want to..."
- Do NOT pad with compliments or softening phrases

IMPROVED CV:
- Full rewrite of the CV optimized for this specific role
- Fix every issue identified in feedback
- Add missing keywords naturally in context (do not just list them)
- Turn every bullet point into an achievement with scope and outcome
- Keep the candidate's actual experience — do not invent anything, just present it better
- Use this exact structure and formatting (plain text, newlines as \\n, no markdown):

[FULL NAME]
[email] | [phone] | [city, country] | [LinkedIn or portfolio if present]

PROFESSIONAL SUMMARY
[2–3 sentence punchy summary tailored to the role]

WORK EXPERIENCE
[Company Name] — [Job Title]
[Month Year] – [Month Year or Present]
• [Achievement with metric/scope/outcome]
• [Achievement with metric/scope/outcome]

EDUCATION
[Institution] — [Degree, Field]
[Year or Year – Year]

SKILLS
[Category]: [skill1, skill2, skill3]
[Category]: [skill1, skill2]

---
JOB DESCRIPTION:
${jobDescription}

---
CV:
${cvText}`;
}

function parseJSON(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    // Strip markdown fences if the model added them
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("AI returned an unexpected format. Please try again.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobDescription = formData.get("jobDescription") as string | null;
    const cvFile = formData.get("cv") as File | null;

    if (!jobDescription?.trim()) {
      return NextResponse.json({ error: "Job description is required." }, { status: 400 });
    }
    if (!cvFile) {
      return NextResponse.json({ error: "CV file is required." }, { status: 400 });
    }

    // Parse PDF server-side
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse");
    const buffer = Buffer.from(await cvFile.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const cvText: string = pdfData.text?.trim() ?? "";

    if (!cvText) {
      return NextResponse.json(
        { error: "Could not extract text from your CV. Make sure it is a text-based PDF, not a scanned image." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(jobDescription, cvText);
    let rawContent = "";

    // Priority: Mistral → OpenAI
    if (process.env.MISTRAL_API_KEY) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const OpenAI = require("openai");
      const mistral = new OpenAI({
        apiKey: process.env.MISTRAL_API_KEY,
        baseURL: "https://api.mistral.ai/v1",
      });
      const response = await mistral.chat.completions.create({
        model: "mistral-small-latest",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 4096,
      });
      rawContent = response.choices[0]?.message?.content ?? "";

    } else if (process.env.OPENAI_API_KEY) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const OpenAI = require("openai");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 4096,
      });
      rawContent = response.choices[0]?.message?.content ?? "";

    } else {
      return NextResponse.json(
        { error: "No AI API key found. Add MISTRAL_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const result = parseJSON(rawContent);
    result.matchScore = Math.min(100, Math.max(0, Math.round(Number(result.matchScore))));

    return NextResponse.json(result);

  } catch (err: unknown) {
    console.error("Analyze error:", err);
    const message = err instanceof Error ? err.message : "Analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

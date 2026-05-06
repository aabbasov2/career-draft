import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Draft — Jobs, with your odds.",
  description:
    "A new kind of job board for early-career talent. Every listing comes with a match score for your CV — plus instant feedback on what to fix before you apply.",
  openGraph: {
    title: "Career Draft — Jobs, with your odds.",
    description:
      "A new kind of job board for early-career talent. Every listing comes with a match score for your CV — plus instant feedback on what to fix before you apply.",
    type: "website",
    siteName: "Career Draft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Draft — Jobs, with your odds.",
    description:
      "A new kind of job board for early-career talent. Every listing comes with a match score for your CV — plus instant feedback on what to fix before you apply.",
  },
  themeColor: "#0A0C10",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter+Tight:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

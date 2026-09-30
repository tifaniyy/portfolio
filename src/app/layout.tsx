import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tifani-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tifani Yunitami | Informatics Graduate & Data Analyst",
    template: "%s | Tifani Yunitami",
  },
  description:
    "Portfolio of Tifani Yunitami, an Informatics graduate interested in data analysis, data visualization, Python, SQL, and web development.",
  keywords: [
    "Tifani Yunitami",
    "Informatics Graduate",
    "Data Analyst",
    "Data Visualization",
    "Python",
    "SQL",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Tifani Yunitami", url: "https://github.com/tifaniyy" }],
  creator: "Tifani Yunitami",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Tifani Yunitami — Portfolio",
    title: "Tifani Yunitami | Informatics Graduate & Data Analyst",
    description:
      "Portfolio of Tifani Yunitami, an Informatics graduate interested in data analysis, data visualization, Python, SQL, and web development.",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Tifani Yunitami — Informatics Graduate, Data Analyst, Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tifani Yunitami | Informatics Graduate & Data Analyst",
    description:
      "Portfolio of Tifani Yunitami, an Informatics graduate interested in data analysis, data visualization, Python, SQL, and web development.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/*
          The scroll-reveal wrappers ship `opacity: 0` inline (that is what
          Motion animates from), so without JavaScript the whole page would
          render blank. This restores the fully-visible state for no-JS
          visitors and for crawlers that do not execute scripts.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}

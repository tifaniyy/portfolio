import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Journals } from "@/components/Journals";
import { Contact } from "@/components/Contact";
import { gmailComposeUrl, profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

/**
 * Structured data helps search engines understand who the page is about.
 * Satu `@graph` berisi tiga simpul yang saling merujuk: orangnya, situsnya, dan
 * halaman profil ini. Simpul terpisah (bukan satu objek) supaya Google bisa
 * menghubungkan entitas "Tifani Yunitami" dengan situs dan halaman yang
 * membahasnya.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: profile.title,
      description: profile.summary,
      url: `${siteUrl}/`,
      email: `mailto:${profile.email}`,
      image: `${siteUrl}/og-image.png`,
      sameAs: [profile.github, profile.linkedin],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Gunadarma",
      },
      knowsAbout: [
        "Data Analysis",
        "Data Processing",
        "Python",
        "SQL",
        "Data Visualization",
        "Web Development",
        "UI/UX",
        "Machine Learning",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "recruitment",
        email: profile.email,
        url: gmailComposeUrl(),
        availableLanguage: ["Indonesian", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: `${profile.name} — Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: `${profile.name} | Informatics Graduate & Data Analyst`,
      about: { "@id": `${siteUrl}/#person` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Journals />
      <Contact />
    </>
  );
}

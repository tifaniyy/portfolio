import type { MetadataRoute } from "next";
import { sortedJournals } from "@/data/journals";
import { getPublishedJournals } from "@/data/journals.server";
import { siteUrl } from "@/lib/site";

/**
 * `/sitemap.xml` — daftar halaman yang boleh diindeks mesin pencari.
 *
 * Hanya tulisan yang sudah terbit (punya tanggal) yang masuk, dan
 * `/journals/kelola` sengaja tidak pernah didaftarkan di sini.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journals = sortedJournals(await getPublishedJournals());

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/journals`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/journals/browse`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const journalRoutes: MetadataRoute.Sitemap = journals.map((journal) => ({
    url: `${siteUrl}/journals/${journal.slug}`,
    lastModified: journal.date ? new Date(journal.date) : undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...journalRoutes];
}

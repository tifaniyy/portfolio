import { sortedJournals } from "@/data/journals";
import { getPublishedJournals } from "@/data/journals.server";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

/**
 * /journals/feed.xml — RSS 2.0 untuk tulisan jurnal.
 *
 * Hanya tulisan yang sudah terbit yang masuk (sama seperti /journals), dan
 * isinya dirender setiap kali diminta supaya tulisan baru langsung muncul
 * tanpa build ulang — pola yang sama dengan halaman /journals itu sendiri.
 * Daftarkan di pembaca feed dengan alamat: <situs>/journals/feed.xml
 */
export const dynamic = "force-dynamic";

/** Buang penanda markdown supaya ringkasan feed enak dibaca. */
function plain(text?: string): string {
  if (!text) return "";
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 — format tanggal yang dipakai RSS. */
function rssDate(date?: string): string {
  const parsed = date ? new Date(`${date}T00:00:00Z`) : new Date();
  return parsed.toUTCString();
}

export async function GET() {
  const journals = sortedJournals(await getPublishedJournals());
  const updated = journals[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = journals
    .map((journal) => {
      const url = `${siteUrl}/journals/${journal.slug}`;
      const description = plain(journal.abstract ?? journal.content).slice(0, 400);

      return `    <item>
      <title>${escapeXml(journal.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rssDate(journal.date)}</pubDate>
      <description>${escapeXml(description)}</description>
${(journal.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .filter(Boolean)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Journal Blog ${escapeXml(profile.shortName)}</title>
    <link>${siteUrl}/journals</link>
    <description>Research notes, data analysis, visualization, and web development — ${escapeXml(profile.name)}.</description>
    <language>id</language>
    <lastBuildDate>${rssDate(updated)}</lastBuildDate>
    <atom:link href="${siteUrl}/journals/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

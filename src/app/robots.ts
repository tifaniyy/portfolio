import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * `/robots.txt` — perbolehkan crawler umum, tapi larang halaman pengelola
 * tulisan (sudah `noindex` juga, ini lapis keduanya) dan arahkan ke sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/journals/kelola"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

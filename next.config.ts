import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * `data/journals.json` dibaca langsung dari disk saat aplikasi jalan (bukan
   * diimpor), jadi Next perlu diberi tahu agar file itu ikut disertakan dalam
   * hasil build/deploy — kalau tidak, di server hasil build file-nya hilang.
   */
  outputFileTracingIncludes: {
    "/*": ["./data/**"],
  },
};

export default nextConfig;

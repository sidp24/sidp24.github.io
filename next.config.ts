import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Served from the root of https://sidp24.github.io, so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // Static export has no image-optimization server; scripts/import-assets.mjs
    // pre-resizes everything in public/.
    unoptimized: true,
  },
};

// Turbopack needs plugins referenced by name, not imported functions.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-math"],
    rehypePlugins: ["rehype-katex"],
  },
});

export default withMDX(nextConfig);

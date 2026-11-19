import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // 2026-11 사진 주제를 다시 나누면서 바뀐 옛 주소를 새 주소로 잇는다.
  async redirects() {
    return [
      { source: "/moments/outdoors", destination: "/moments/walks", permanent: true },
      { source: "/moments/slow", destination: "/moments/cafe", permanent: true },
      { source: "/moments/company", destination: "/moments/friends", permanent: true },
      { source: "/moments/weather", destination: "/moments", permanent: true },
      { source: "/moments/seasons", destination: "/moments", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

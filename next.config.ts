import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // 사진 주제별 페이지(/moments/walks 등)는 없앴다. 옛 주소는 사진첩으로 잇는다.
  async redirects() {
    return [{ source: "/moments/:path+", destination: "/moments", permanent: true }];
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

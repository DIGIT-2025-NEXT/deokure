import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // 静的書き出し
  basePath: "/deokure",      // リポジトリ名を指定
  images: {
    unoptimized: true,       // 画像最適化をオフ
  },
};

export default nextConfig;


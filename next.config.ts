import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  basePath: isGitHubPages ? "/xiaosuanlife-official" : "",
  assetPrefix: isGitHubPages ? "/xiaosuanlife-official" : undefined,
};

export default nextConfig;

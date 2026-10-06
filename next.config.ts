import type { NextConfig } from "next";

// Sous-chemin de publication (ex. "/auxillum" pour GitHub Pages), fourni par
// le workflow de déploiement. Vide en local.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Site 100 % statique : exporté dans out/ pour un hébergement sans serveur.
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

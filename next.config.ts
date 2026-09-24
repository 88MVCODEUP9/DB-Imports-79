import type { NextConfig } from "next";

// Caminho base dos assets para o GitHub Pages. Quando o site é publicado em
// https://USUARIO.github.io/REPOSITORIO/, esse valor deve ser "/REPOSITORIO".
// Quando publicado na raiz (ex.: contas USUARIO.github.io), fica vazio.
// O workflow de deploy (.github/workflows/deploy.yml) define isso sozinho.
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(assetPrefix ? { assetPrefix } : {}),
};

export default nextConfig;
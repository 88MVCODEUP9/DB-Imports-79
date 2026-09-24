import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig(() => {
  // No GitHub Actions, GITHUB_REPOSITORY vem como:
  // "usuario/nome-do-repositorio"
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];

  // GitHub Pages de projeto:
  // https://usuario.github.io/repositorio/
  const base = process.env.GITHUB_ACTIONS && repository
    ? `/${repository}/`
    : "/";

  return {
    base,
    plugins: [vinext()],
  };
});

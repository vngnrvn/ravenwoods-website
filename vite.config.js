import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project sites need the repository name as the base path.
  // GitHub Actions sets this automatically from the repository name.
  base: process.env.GITHUB_ACTIONS ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1] || ""}/` : "/"
});

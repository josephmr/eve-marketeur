import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    allowedHosts: ["sideboard.dev", "localhost", "game-wsl.elf-lake.ts.net"],
  },
  plugins: [tailwindcss(), sveltekit()],
});

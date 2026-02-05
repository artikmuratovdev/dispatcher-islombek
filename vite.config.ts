import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectRegister: false,
      srcDir: ".",
      filename: "sw.js",
      manifest: {
        name: "Islombek nonlari dispatcher",
        short_name: "Islombek nonlari dispatcher",
        theme_color: "#1C2C57",
        display: "standalone",
        background_color: "#1C2C57",
        start_url: "/",
        icons: [
          {
            src: "/login_logo.svg",
            sizes: "165x165",
            type: "image/svg+xml",
          },
        ],
      },
      injectManifest: {
        swSrc: "sw.js",
        globPatterns: ["**/*.{js,css,html,png,svg,jpg}"],
        swDest: "dist/sw.js",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

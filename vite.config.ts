import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectRegister: false,
      srcDir: "",
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
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,jpg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
            },
          },
          {
            urlPattern: /\.(?:js|css|html|png|jpg|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,png,svg,jpg}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

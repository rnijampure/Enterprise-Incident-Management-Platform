import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
// https://vite.dev/config/
import fs from "fs";
import path from "path";
export default defineConfig({
  plugins: [
    basicSsl(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  server: {
    https: {
      // Use the same certs as your backend
      key: fs.readFileSync(path.resolve(__dirname, "../localhost+2-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "../localhost+2.pem")),
    },
    hmr: {
      protocol: "wss",
      host: "localhost",
    },
  },
});
/* server: {
    port: 5173,
    // REMOVE "https: true" from here
    proxy: {
      "/api": {
        target: "https://localhost:5000",
        changeOrigin: true,
        secure: false, // Essential for local self-signed certs
      },
    },
  },*/

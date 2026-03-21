import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyPath = path.resolve(__dirname, "../localhost+2-key.pem");
const certPath = path.resolve(__dirname, "../localhost+2.pem");
const hasCert = fs.existsSync(keyPath) && fs.existsSync(certPath);

export default defineConfig({
  plugins: [
    // 2. Only use basicSsl if we DON'T have our own custom certs
    ...(hasCert ? [] : [basicSsl()]),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  server: {
    // 3. CRITICAL: Only call readFileSync if hasCert is true
    https: hasCert
      ? {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        }
      : undefined, // Fallback to true allows basicSsl or Vercel to handle it

    hmr: {
      // 4. Use 'wss' only if we are in a secure local environment
      protocol: hasCert ? "wss" : "ws",
      host: "localhost",
    },
  },
});

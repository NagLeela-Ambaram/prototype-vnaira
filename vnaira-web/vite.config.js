import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Custom plugin to serve Brotli-compressed Unity WebGL files
      name: "unity-brotli",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.endsWith(".br")) {
            // Set Content-Encoding so browser decompresses automatically
            res.setHeader("Content-Encoding", "br");

            // Set correct Content-Type based on the actual file type
            if (req.url.endsWith(".js.br")) {
              res.setHeader("Content-Type", "application/javascript");
            } else if (req.url.endsWith(".wasm.br")) {
              res.setHeader("Content-Type", "application/wasm");
            } else if (req.url.endsWith(".data.br")) {
              res.setHeader("Content-Type", "application/octet-stream");
            }
          }
          next();
        });
      },
    },
  ],
  base: "./",
  server: {
    port: 3000,
    open: true,
  },
});

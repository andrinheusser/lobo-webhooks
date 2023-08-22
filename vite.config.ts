import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [preact()],
    server: {
      port: 8080,
      proxy: {
        "/lobo": {
          target: env.VITE_LOBO_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/lobo/, ""),
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log(
                "Sending Request:",
                req.method,
                req.url,
                " => TO THE TARGET =>  ",
                proxyReq.method,
                proxyReq.protocol,
                proxyReq.host,
                proxyReq.path,
                JSON.stringify(proxyReq.getHeaders()),
              );
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url,
                JSON.stringify(proxyRes.headers),
              );
            });
          },
        },
      },
    },
  };
});

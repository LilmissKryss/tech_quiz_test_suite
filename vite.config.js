import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/_tests_/setup.ts",
    },
    server: {
        port: 3004,
        open: false,
        proxy: {
            "/api": {
                target: "http://localhost:3005",
                secure: false,
                changeOrigin: true,
            },
        },
    },
});

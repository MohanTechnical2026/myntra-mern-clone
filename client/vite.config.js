import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This config also proxies "/api" and "/local-assets" requests to our
// backend server during development, so we don't have to write the
// full "http://localhost:5000" every time in our code.
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            "/api": "http://localhost:5000",
            "/local-assets": "http://localhost:5000",
        },
    },
});

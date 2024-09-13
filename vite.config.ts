import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // この行を追加
  build: {
    assetsDir: "assets", // この行を追加または修正
  },
});

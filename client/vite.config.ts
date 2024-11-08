import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@type": path.resolve(__dirname, "./src/types")
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
	},
	server: {
		port: 5173, // use env variable
		host: true,
		watch: {
			usePolling: true
		}
	}
});

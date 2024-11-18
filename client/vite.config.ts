import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			"@": "client/src",
			"@components": "client/src/components",
			"@lib": "client/src/lib",
			"@t": "/shared/types"
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
	},
	server: {
		watch: {
			usePolling: true
		}
	}
});

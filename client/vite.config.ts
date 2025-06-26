import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// I think I recall seeing somewhere that the order of these plugins
		// matters. Tanstack Router is weird like that, so it could be necessary.
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			quoteStyle: "double"
		}),
		viteReact({
			babel: {
				plugins: ["styled-components"],
				babelrc: false,
				configFile: false
			}
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "../client/src"),
			"@lib": path.resolve(__dirname, "../client/src/lib"),
			"@components": path.resolve(__dirname, "../client/src/components"),
			"@shared": path.resolve(__dirname, "../shared/src")
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
	},
	server: {
		watch: {
			usePolling: true
		}
	}
});

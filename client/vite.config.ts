import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
		}),
		tsconfigPaths()
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@shared": fileURLToPath(new URL("../shared/src", import.meta.url)),
			"@server": fileURLToPath(new URL("../server/src", import.meta.url))
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
	},
	server: {
		watch: {
			usePolling: true
		}
	}
});

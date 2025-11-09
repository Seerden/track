import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	envDir: ".",
	plugins: [
		// I think I recall seeing somewhere that the order of these plugins
		// matters. Tanstack Router is weird like that, so it could be necessary.
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			quoteStyle: "double",
		}),
		viteReact({
			babel: {
				plugins: ["@emotion/babel-plugin", "babel-plugin-react-compiler"],
				babelrc: false,
				configFile: false,
			},
		}),
		VitePWA({
			strategies: "injectManifest",
			srcDir: "src",
			filename: "sw.ts",
			registerType: "autoUpdate",
			devOptions: {
				enabled: true,
				type: "module",
			},
			manifest: {
				name: "Track",
				short_name: "Track",
				icons: [
					// TODO: generate some icons for Track
					//  {
					//    src: '/icons/icon-192x192.png',
					//    sizes: '192x192',
					//    type: 'image/png',
					//  },
					//  {
					//    src: '/icons/icon-512x512.png',
					//    sizes: '512x512',
					//    type: 'image/png',
					//  },
				],
			},
		}),
		tsconfigPaths({
			ignoreConfigErrors: true,
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
			"@components": fileURLToPath(
				new URL("./src/components", import.meta.url)
			),
			"@shared": fileURLToPath(new URL("../shared/src", import.meta.url)),
			"@server": fileURLToPath(new URL("../server/src", import.meta.url)),
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
	},
	server: {
		host: true,
		port: 5175,
		watch: {
			usePolling: true,
		},
	},
	build: {
		emptyOutDir: true,
		outDir: "./dist/public",
	},
});

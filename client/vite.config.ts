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
				presets: [
					[
						"@babel/preset-react",
						{ runtime: "automatic", importSource: "@emotion/react" },
					],
				],
				plugins: ["babel-plugin-react-compiler", "@emotion/babel-plugin"],
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
				description: "Habit tracking and planning",
				theme_color: "#7746ffff",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				// defining cached files formats
				globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
				globIgnores: ["**/api/trpc/**", "**/node_modules/**"],
				cacheId: "seerden/track/288",
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
	publicDir: "public",
	build: {
		emptyOutDir: true,
		outDir: "./dist/public",
	},
});

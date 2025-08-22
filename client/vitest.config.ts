import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig,

	defineConfig({
		test: {
			include: ["**/*.test.ts", "**/*.test.tsx"],
			globals: true,
			environment: "jsdom",
			setupFiles: ["./vitest.setup.ts"],
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
				"@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
				"@shared": fileURLToPath(new URL("../shared/src", import.meta.url)),
				"@server": fileURLToPath(new URL("../server/src", import.meta.url))
			},
			pool: "threads",
			poolOptions: {
				threads: {
					maxThreads: 16
				}
			}
		}
	})
);

import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/*.test.ts"],
		globals: true,
		environment: "node",
		setupFiles: ["./vitest.setup.ts"],
		env: config().parsed,
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
			"@shared": fileURLToPath(new URL("../shared/src", import.meta.url)),
			types: fileURLToPath(new URL("../server/types", import.meta.url)),
		},
		pool: "threads",
	},
});

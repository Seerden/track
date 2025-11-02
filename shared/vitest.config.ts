import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/*.test.ts"],
		globals: true,
		environment: "node",
		env: config().parsed,
		alias: {
			"@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
			"@types": fileURLToPath(new URL("./types", import.meta.url)),
		},
		pool: "threads",
	},
});

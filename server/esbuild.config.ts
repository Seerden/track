import esbuild from "esbuild";
import { cp } from "fs/promises";
import { resolve } from "path";
import packageJson from "./package.json" with { type: "json" };

const dependencies = Object.keys(packageJson.dependencies);
const devDependencies = Object.keys(packageJson.devDependencies);

/** @see https://esbuild.github.io/api/#general-options */
async function build() {
	esbuild
		.build({
			entryPoints: ["./index.ts"],
			outfile: "./dist/server.js",
			bundle: true,
			platform: "node",
			target: "esnext",
			format: "esm",
			sourcemap: false,
			minify: true,
			// TODO: check if this is necessary. I imagine with this, we need to
			// install the packages at the run-site, but without it, we could just
			// run the built application as standalone.
			external: [...dependencies, ...devDependencies],
		})
		.then(async () => {
			const srcDir = resolve("server/src/db/scripts");
			const destDir = resolve("dist/scripts"); // See explanation below

			try {
				console.log(`Copying SQL scripts from ${srcDir} to ${destDir}...`);
				await cp(srcDir, destDir, { recursive: true });
				console.log("SQL scripts copied successfully.");
			} catch (err) {
				console.error("Failed to copy SQL scripts:", err);
			}
		})
		.catch(() => process.exit(1));
}

build();

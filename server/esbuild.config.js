import esbuild from "esbuild";
import packageJson from "./package.json" with { type: "json" };

const dependencies = Object.keys(packageJson.dependencies);
const devDependencies = Object.keys(packageJson.devDependencies);

/** @see https://esbuild.github.io/api/#general-options */
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
	.catch(() => process.exit(1));

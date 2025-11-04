import fs, { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { sqlConnection } from "@/db/init";
import { redisClient } from "@/lib/redis/redis-client";

const databaseScriptCacheKey = {
	up: "database-scripts:up",
};

const scriptsFolder = path.join(fileURLToPath(import.meta.url), "../scripts");

/** Gets the list of .sql files that have been run. */
async function getExecutedScriptNames() {
	const migrations = await redisClient.smembers(databaseScriptCacheKey.up);
	return migrations;
}

/** Checks if a given .sql file has been run */
async function scriptHasRun(filename: string) {
	const hasRun = await redisClient.sismember(
		databaseScriptCacheKey.up,
		filename
	);
	return Boolean(hasRun);
}

/** Add the .sql file to the list of files that have been run. */
async function markScriptAsRun(filenmae: string) {
	const added = await redisClient.sadd(databaseScriptCacheKey.up, filenmae);
	return added;
}

/**
 * The database setup files are in ./scripts. This function returns the list of
 * files in that directory.
 **/
export async function getScriptFilenames() {
	const files = (await fs.readdir(scriptsFolder))
		.filter((file: string) => file.endsWith(".sql"))
		.map((file) => file.replace(".sql", ""));
	return files;
}

// dev only
export async function DEV_seedScripts() {
	const filenames = await getScriptFilenames();
	for (const filename of filenames) {
		await markScriptAsRun(filename);
		console.log({ filename });
	}
}

export async function runAndCacheNewScripts() {
	const filenames = await getScriptFilenames();
	const executedScriptFilenames = await getExecutedScriptNames();
	const unexecutedScriptFilenames = filenames.filter(
		(filename) => !executedScriptFilenames.includes(filename)
	);

	for (const filename of unexecutedScriptFilenames) {
		const queryAsString = await readFile(
			path.join(scriptsFolder, `${filename}.sql`),
			"utf-8"
		);
		await sqlConnection.begin(async (q) => {
			const response = await q.unsafe(queryAsString);
			console.log({ message: `Ran migration ${filename}`, response });
			await markScriptAsRun(filename);
		});
	}
}

const databaseScriptCache = {
	_key: databaseScriptCacheKey,
	list: getExecutedScriptNames,
	check: scriptHasRun,
	set: markScriptAsRun,
	synchronize: runAndCacheNewScripts,
};

export default databaseScriptCache;

import { sqlConnection } from "@/db/init";
import { redisClient } from "@/lib/redis/redis-client";
import fs, { readFile } from "fs/promises";
import path from "path";

const migrationCacheKey = {
	up: "migrations:up",
};

/** Gets the list of .sql files that have been run. */
async function getMigrations(): Promise<string[]> {
	const migrations = await redisClient.smembers(migrationCacheKey.up);
	return migrations;
}

/** Checks if a given .sql file has been run */
async function migrationHasRun(migration: string): Promise<boolean> {
	const hasRun = await redisClient.sismember(migrationCacheKey.up, migration);
	return Boolean(hasRun);
}

/** Add the .sql file to the list of files that have been run. */
async function markMigrationAsRun(migration: string): Promise<number> {
	const added = await redisClient.sadd(migrationCacheKey.up, migration);
	return added;
}

/**
 * The database setup files are in ./scripts. This function returns the list of
 * files in that directory.
 **/
export async function getMigrationFiles() {
	const pathToScripts = path.join(__dirname, "./scripts");
	const files = (await fs.readdir(pathToScripts))
		.filter((file: string) => file.endsWith(".sql"))
		.map((file) => file.replace(".sql", ""));
	return files;
}

// dev only
export async function DEV_seedMigrations() {
	const migrations = await getMigrationFiles();
	for (const migration of migrations) {
		await markMigrationAsRun(migration);
	}
}

export async function runAndCacheNewMigrations() {
	const migrations = await getMigrationFiles();
	const existingMigrations = await getMigrations();
	const newMigrations = migrations.filter(
		(migration) => !existingMigrations.includes(migration),
	);

	for (const migration of newMigrations) {
		const queryAsString = await readFile(
			path.join(__dirname, `./scripts/${migration}.sql`),
			"utf-8",
		);
		await sqlConnection.begin(async (q) => {
			const response = await q.unsafe(queryAsString);
			console.log({ message: `Ran migration ${migration}`, response });
			await markMigrationAsRun(migration);
		});
	}
}

const migrationCache = {
	_key: migrationCacheKey,
	list: getMigrations,
	check: migrationHasRun,
	set: markMigrationAsRun,
	synchronize: runAndCacheNewMigrations,
};

export default migrationCache;

import migrationCache from "@/db/cache-migrations";

export async function runAtStartup() {
	await migrationCache.synchronize();
}

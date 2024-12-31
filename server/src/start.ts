import databaseScriptCache from "@/db/cache-script-executions";

export async function runAtStartup() {
	await databaseScriptCache.synchronize();
}

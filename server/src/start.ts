import * as Sentry from "@sentry/node";
import type { SeverityLevel } from "@sentry/types";
import databaseScriptCache from "@/db/cache-script-executions";

export async function runAtStartup() {
	try {
		await databaseScriptCache.synchronize();
	} catch (error) {
		Sentry.captureEvent({
			message: "Failed to runAtStartup",
			// @note in v8, Sentry says to use SeverityLevel like this, but in v9
			// it's deprecated again 🫠
			level: "error" as SeverityLevel,
			extra: { error }
		});
	}
}

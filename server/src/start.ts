import type { SeverityLevel } from "@sentry/core";
import * as Sentry from "@sentry/node";
import databaseScriptCache, {
	DEV_seedScripts,
} from "@/db/cache-script-executions";
import { sendTestNotification } from "./lib/notifications/test-notification";

export async function runAtStartup() {
	try {
		await DEV_seedScripts();
		await databaseScriptCache.synchronize();

		console.log(await sendTestNotification());
	} catch (error) {
		console.error(error);
		Sentry.captureEvent({
			message: "Failed to runAtStartup",
			// @note in v8, Sentry says to use SeverityLevel like this, but in v9
			// it's deprecated again 🫠
			level: "error" as SeverityLevel,
			extra: { error },
		});
	}
}

// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import type { ErrorRequestHandler, Response } from "express";

if (!Sentry.isInitialized()) {
	Sentry.init({
		environment: process.env.NODE_ENV,
		enableLogs: true,
		dsn: "https://f03ede6b86784fda49e2fc75bf8bb29e@o4508463516680192.ingest.de.sentry.io/4508574988828752",
		integrations: [
			nodeProfilingIntegration(),
			Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
		],
		tracesSampleRate: 1.0,
		sendDefaultPii: true,
	});
}

export { Sentry };

interface CustomResponse extends Response {
	sentry?: string;
}

export const onError: ErrorRequestHandler = (
	err,
	_req,
	res: CustomResponse,
	_next
) => {
	console.error(err);
	res.statusCode = 500;
	res.end(res.sentry + "\n");
};

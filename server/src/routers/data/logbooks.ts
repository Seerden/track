import { logbookServiceMapped } from "@/routers/data/logbook-service";
import type { Method } from "@shared/lib/endpoints/logbooks-endpoints";
import type { RequestHandler } from "express";
import { Router } from "express";

export const logbooksRouter = Router({ mergeParams: true });

// TODO: I'm using more specific names for the handlers. Go over previous
// handlers and do the same for them, too.

for (const group of Object.values(logbookServiceMapped)) {
	for (const [method, byMethod] of Object.entries(group)) {
		for (const [routeKey, { path, handler }] of Object.entries(byMethod)) {
			console.log({ method, path });
			logbooksRouter[method as Method](path, handler as RequestHandler);
		}
	}
}

console.log({ routes: logbooksRouter.stack.map((layer) => layer.route) });

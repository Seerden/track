import { logbookService } from "@/routers/data/logbook-service";
import { Router } from "express";

export const logbooksRouter = Router({ mergeParams: true });

// TODO: I'm using more specific names for the handlers. Go over previous
// handlers and do the same for them, too.

for (const group of Object.values(logbookService)) {
	for (const endpoint of Object.values(group)) {
		const { path, handler, method = "get" } = endpoint;
		logbooksRouter[method](path, handler);
	}
}

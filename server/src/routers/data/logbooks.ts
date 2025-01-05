import { logbookServiceMapped } from "@/routers/data/logbook-service";
import { mapServiceToRouter } from "@/routers/map-router";
import { Router } from "express";

const logbooksRouter = Router({ mergeParams: true });

// TODO: I'm using more specific names for the handlers. Go over previous
// handlers and do the same for them, too.

mapServiceToRouter({
	mappedService: logbookServiceMapped,
	router: logbooksRouter,
});

export { logbooksRouter };

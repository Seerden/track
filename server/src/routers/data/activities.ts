import { activityServiceMapped } from "@/routers/data/activity-service";
import { mapServiceToRouter } from "@/routers/map-router";
import { Router } from "express";

const activitiesRouter = Router({ mergeParams: true });

mapServiceToRouter({
	mappedService: activityServiceMapped,
	router: activitiesRouter,
});

export { activitiesRouter };

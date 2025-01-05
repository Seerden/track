import { getActivities } from "@/lib/data/request-handlers/activities/get-activities";
import { postActivity } from "@/lib/data/request-handlers/activities/post-activity";
import { putActivity } from "@/lib/data/request-handlers/activities/put-activity";
import { putTaskCompletion } from "@/lib/data/request-handlers/activities/put-task";
import type { ActivityService } from "@shared/lib/endpoints/activities-endpoints";
import { activityEndpointsService } from "@shared/lib/endpoints/activities-endpoints";
import type { MappedService } from "@shared/lib/endpoints/endpoint.types";
import { mapEndpoints } from "@shared/lib/endpoints/map-endpoints";
import type { RequestHandler } from "express";

const unimplementedHandler: RequestHandler = (req, res) => {
	res.json({ message: "Not implemented" });
};

export const activityServiceMapped: MappedService<ActivityService> = {
	activities: mapEndpoints(activityEndpointsService.activities, {
		get: {
			getByUser: getActivities,
		},
		post: {
			post: postActivity,
		},
		put: {
			putActivity,
			putTaskCompletion,
		},
		delete: {},
	}),
	recurrence: mapEndpoints(activityEndpointsService.recurrence, {
		get: {
			getOccurrencesByRecurrence: unimplementedHandler,
			getOccurrencesByUser: unimplementedHandler,
			getRecurrenceByActivity: unimplementedHandler,
			getRecurrencesByUser: unimplementedHandler,
		},
		post: {
			postOccurrence: unimplementedHandler,
			postRecurrence: unimplementedHandler,
		},
		put: {
			putOccurrence: unimplementedHandler,
			putRecurrence: unimplementedHandler,
		},
		delete: {
			deleteOccurrence: unimplementedHandler,
			deleteRecurrence: unimplementedHandler,
		},
	}),
};

import { deleteOccurrence } from "@/lib/data/request-handlers/activities/delete-occurrence";
import { deleteRecurrence } from "@/lib/data/request-handlers/activities/delete-recurrence";
import { getActivities } from "@/lib/data/request-handlers/activities/get-activities";
import {
	getOccurrencesByRecurrence,
	getOccurrencesByUser,
} from "@/lib/data/request-handlers/activities/get-occurrence";
import {
	getRecurrenceByActivity,
	getRecurrencesByUser,
} from "@/lib/data/request-handlers/activities/get-recurrence";
import { postActivity } from "@/lib/data/request-handlers/activities/post-activity";
import { postOccurrence } from "@/lib/data/request-handlers/activities/post-occurrence";
import { postRecurrence } from "@/lib/data/request-handlers/activities/post-recurrence";
import { putActivity } from "@/lib/data/request-handlers/activities/put-activity";
import { putOccurrence } from "@/lib/data/request-handlers/activities/put-occurrence";
import { putRecurrence } from "@/lib/data/request-handlers/activities/put-recurrence";
import { putTaskCompletion } from "@/lib/data/request-handlers/activities/put-task";
import type { ActivityService } from "@shared/lib/endpoints/activities-endpoints";
import { activityEndpointsService } from "@shared/lib/endpoints/activities-endpoints";
import type { MappedService } from "@shared/lib/endpoints/endpoint.types";
import { mapEndpoints } from "@shared/lib/endpoints/map-endpoints";

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
			getOccurrencesByRecurrence,
			getOccurrencesByUser,
			getRecurrenceByActivity,
			getRecurrencesByUser,
		},
		post: {
			postOccurrence,
			postRecurrence,
		},
		put: {
			putOccurrence,
			putRecurrence,
		},
		delete: {
			deleteOccurrence,
			deleteRecurrence,
		},
	}),
};

import activityHandlers from "@/lib/data/request-handlers/activities/_handlers";
import type { ActivityService } from "@shared/lib/endpoints/activities-endpoints";
import { activityEndpointsService } from "@shared/lib/endpoints/activities-endpoints";
import type { MappedService } from "@shared/lib/endpoints/endpoint.types";
import { mapEndpoints } from "@shared/lib/endpoints/map-endpoints";

const { GET, POST, PUT, DELETE } = activityHandlers;

export const activityServiceMapped: MappedService<ActivityService> = {
	activities: mapEndpoints(activityEndpointsService.activities, {
		get: {
			getByUser: GET.getActivities,
		},
		post: {
			post: POST.postActivity,
			postRecurring: POST.postRecurringActivity,
		},
		put: {
			putActivity: PUT.putActivity,
			putTaskCompletion: PUT.putTaskCompletion,
		},
		delete: {},
	}),
	recurrence: mapEndpoints(activityEndpointsService.recurrence, {
		get: {
			getOccurrencesByRecurrence: GET.getOccurrencesByRecurrence,
			getOccurrencesByUser: GET.getOccurrencesByUser,
			getRecurrenceByActivity: GET.getRecurrenceByActivity,
			getRecurrencesByUser: GET.getRecurrencesByUser,
		},
		post: {
			postOccurrence: POST.postOccurrence,
			postRecurrence: POST.postRecurrence,
		},
		put: {
			putOccurrence: PUT.putOccurrence,
			putRecurrence: PUT.putRecurrence,
		},
		delete: {
			deleteOccurrence: DELETE.deleteOccurrence,
			deleteRecurrence: DELETE.deleteRecurrence,
		},
	}),
};

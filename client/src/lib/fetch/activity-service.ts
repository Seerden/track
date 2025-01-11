import api from "@/lib/fetch/api";
import type {
	ActivitiesData,
	OccurrencesData,
	RecurrencesData
} from "@/types/data.types";
import { clientPathBuilder } from "@shared/lib/client-url-builder";
import type {
	ActivityInput,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput
} from "@shared/types/data/activity.types";

import { activityEndpointsService as urls } from "@shared/lib/endpoints/activities-endpoints";
import type {
	NewOccurrenceInput,
	NewRecurrenceInput,
	Occurrence,
	OccurrenceInput,
	Recurrence,
	RecurrenceInput
} from "@shared/types/data/recurrence.types";
import type { ID, Maybe } from "@shared/types/data/utility.types";

const getPath = clientPathBuilder("/data/activities");

const activityService = {
	activities: {
		getByUser: async () =>
			api.get<ActivitiesData>({
				url: getPath(urls.activities.get.getByUser)({})
			}),
		putTaskCompletion: async (input: TaskUpdateInput) =>
			api.put<TaskUpdateInput, ActivityWithIds>({
				url: getPath(urls.activities.put.putTaskCompletion)({}),
				body: input
			}),
		putActivity: async (input: ActivityUpdateInput) =>
			api.put<ActivityUpdateInput, ActivityWithIds>({
				url: getPath(urls.activities.put.putActivity)({
					activity_id: input.activity.activity_id
				}),
				body: input
			}),
		post: async (input: ActivityInput) =>
			api.post<ActivityInput, ActivityWithIds>({
				url: getPath(urls.activities.post.post)({}),
				body: input
			}),
		postRecurring: async (input: ActivityInput & NewRecurrenceInput) =>
			api.post<ActivityInput & NewRecurrenceInput, ActivityWithIds>({
				url: getPath(urls.activities.post.postRecurring)({}),
				body: input
			})
	},
	recurrence: {
		get: {
			getOccurrencesByRecurrence: async (recurrence_id: ID) =>
				api.get<OccurrencesData>({
					url: getPath(urls.recurrence.get.getOccurrencesByRecurrence)({
						recurrence_id
					})
				}),
			getOccurrencesByUser: async () =>
				api.get<OccurrencesData>({
					url: getPath(urls.recurrence.get.getOccurrencesByUser)({})
				}),
			getRecurrenceByActivity: async (activity_id: ID) =>
				api.get<Maybe<Recurrence>>({
					url: getPath(urls.recurrence.get.getRecurrenceByActivity)({
						activity_id
					})
				}),
			getRecurrencesByUser: async () =>
				api.get<RecurrencesData>({
					url: getPath(urls.recurrence.get.getRecurrencesByUser)({})
				})
		},
		post: {
			postOccurrence: async (input: NewOccurrenceInput) =>
				api.post<NewOccurrenceInput, Occurrence>({
					url: getPath(urls.recurrence.post.postOccurrence)({}),
					body: input
				}),
			postRecurrence: async (input: NewRecurrenceInput) =>
				api.post<NewRecurrenceInput, Recurrence>({
					url: getPath(urls.recurrence.post.postRecurrence)({}),
					body: input
				})
		},
		put: {
			putOccurrence: async (input: OccurrenceInput) =>
				api.put<OccurrenceInput, Occurrence>({
					url: getPath(urls.recurrence.put.putOccurrence)({
						occurrence_id: input.occurrence.occurrence_id
					}),
					body: input
				}),
			putRecurrence: async (input: RecurrenceInput) =>
				api.put<RecurrenceInput, Recurrence>({
					url: getPath(urls.recurrence.put.putRecurrence)({
						recurrence_id: input.recurrence.recurrence_id
					}),
					body: input
				})
		},
		delete: {
			deleteOccurrence: async (occurrence_id: ID) =>
				api.delete<Pick<Occurrence, "occurrence_id">>({
					url: getPath(urls.recurrence.delete.deleteOccurrence)({ occurrence_id })
				}),
			deleteRecurrence: async (recurrence_id: ID) =>
				api.delete<Pick<Recurrence, "recurrence_id">>({
					url: getPath(urls.recurrence.delete.deleteRecurrence)({ recurrence_id })
				})
		}
	}
};

export default activityService;

import api from "@/lib/fetch/api";
import type { ActivitiesData } from "@/types/data.types";
import { clientUrlBuilder } from "@shared/lib/client-url-builder";
import type {
	ActivityInput,
	ActivityUpdateInput,
	ActivityWithIds,
	TaskUpdateInput
} from "@shared/types/data/activity.types";

async function getActivities() {
	return api.get<ActivitiesData>({ url: "/data/activities" });
}

async function putTaskCompletion(input: TaskUpdateInput) {
	return api.put<TaskUpdateInput, ActivityWithIds>({
		url: `/data/task/completion`,
		body: input
	});
}

async function putActivity(input: ActivityUpdateInput) {
	return api.put<ActivityUpdateInput, ActivityWithIds>({
		url: `/data/activity/${input.activity.activity_id}`,
		body: input
	});
}

async function postNewActivity(input: ActivityInput) {
	return api.post<ActivityInput, ActivityWithIds>({
		url: "/data/activity",
		body: input
	});
}

const activityService = {
	getByUser: getActivities,
	putCompletion: putTaskCompletion,
	put: putActivity,
	post: postNewActivity
};

export default activityService;

// USE SHARED SERVICE

import { activityEndpointsService as urls } from "@shared/lib/endpoints/activities-endpoints";
import type { ID } from "@shared/types/data/utility.types";

const getPath = (url: string) => clientUrlBuilder(url, "/data/activities").makeClientPath;
const newService = {
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
			})
	},
	recurrence: {
		get: {
			getOccurrencesByRecurrence: async () =>
				api.get<>({
					url: getPath(urls.recurrence.get.getOccurrencesByRecurrence)({})
				}),
			getOccurrencesByUser: async () =>
				api.get<>({
					url: getPath(urls.recurrence.get.getOccurrencesByUser)({})
				}),
			getRecurrenceByActivity: async () =>
				api.get<>({
					url: getPath(urls.recurrence.get.getRecurrenceByActivity)({})
				}),
			getRecurrencesByUser: async () =>
				api.get<>({
					url: getPath(urls.recurrence.get.getRecurrencesByUser)({})
				})
		},
		post: {
			postOccurrence: async (input) =>
				api.post<>({
					url: getPath(urls.recurrence.post.postOccurrence)({}),
					body: input
				}),
			postRecurrence: async (input) =>
				api.post<>({
					url: getPath(urls.recurrence.post.postRecurrence)({}),
					body: input
				})
		},
		put: {
			putOccurrence: async (input) =>
				api.put<>({
					url: getPath(urls.recurrence.put.putOccurrence)({}),
					body: input
				}),
			putRecurrence: async (input) =>
				api.put<>({
					url: getPath(urls.recurrence.put.putRecurrence)({}),
					body: input
				})
		},
		delete: {
			deleteOccurrence: async (occurrence_id: ID) =>
				api.delete<>({
					url: getPath(urls.recurrence.delete.deleteOccurrence)({ occurrence_id })
				}),
			deleteRecurrence: async (recurrence_id: ID) =>
				api.delete<>({
					url: getPath(urls.recurrence.delete.deleteRecurrence)({ recurrence_id })
				})
		}
	}
};

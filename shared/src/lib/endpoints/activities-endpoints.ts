import { ServerSubService, SubService } from "./endpoint.types";

type ActivitySubService = "activities" | "recurrence";

export type ActivityService = Record<ActivitySubService, SubService>;
export type ServerActivityService = Record<
	ActivitySubService,
	ServerSubService
>;

const activities = {
	get: {
		getByUser: "/activities", // getActivities
	},
	post: {
		post: "/", // postActivity
	},
	put: {
		putActivity: "/:activity_id", // putActivity
		putTaskCompletion: "/task/completion", // putTaskCompletion
	},
	delete: {},
} satisfies SubService;

const recurrence = {
	get: {
		getRecurrencesByUser: "/recur",
		getOccurrencesByUser: "/recur/occurrences",
		getRecurrenceByActivity: "/recur/activity/:activity_id/recurrence",
		getOccurrencesByRecurrence: "/recur/:recurrence_id/occurrences",
	},
	post: {
		postRecurrence: "/recur/recurrence",
		postOccurrence: "/recur/occurrence",
	},
	put: {
		putRecurrence: "/recur/recurrence/:recurrence_id",
		putOccurrence: "/recur/occurrence/:occurrence_id",
	},
	delete: {
		deleteRecurrence: "/recur/recurrence/:recurrence_id",
		deleteOccurrence: "/recur/occurrence/:occurrence_id",
	},
} satisfies SubService;

// base: data/activities
export const activityEndpointsService = {
	activities,
	recurrence,
} satisfies ActivityService;

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
	} as const,
	post: {
		post: "/", // postActivity
		postRecurring: "/recurring", // postRecurringActivity
	} as const,
	put: {
		putActivity: "/:activity_id", // putActivity
		putTaskCompletion: "/task/completion", // putTaskCompletion
	} as const,
	delete: {} as const,
} satisfies SubService;

const recurrence = {
	get: {
		getRecurrencesByUser: "/recur" as const,
		getOccurrencesByUser: "/recur/occurrences" as const,
		getRecurrenceByActivity: "/recur/activity/:activity_id/recurrence" as const,
		getOccurrencesByRecurrence: "/recur/:recurrence_id/occurrences" as const,
	} as const,
	post: {
		postRecurrence: "/recur/recurrence",
		postOccurrence: "/recur/occurrence",
	} as const,
	put: {
		putRecurrence: "/recur/recurrence/:recurrence_id",
		putOccurrence: "/recur/occurrence/:occurrence_id",
	} as const,
	delete: {
		deleteRecurrence: "/recur/recurrence/:recurrence_id",
		deleteOccurrence: "/recur/occurrence/:occurrence_id",
	} as const,
} satisfies SubService;

// base: data/activities
export const activityEndpointsService = {
	activities,
	recurrence,
} satisfies ActivityService;

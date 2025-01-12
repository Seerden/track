import { ServerSubService, SubService } from "./endpoint.types";

type ActivitySubService = "activities" | "recurrence";

export type ActivityService = Record<ActivitySubService, SubService>;
export type ServerActivityService = Record<
	ActivitySubService,
	ServerSubService
>;

const activities = {
	get: {
		getByUser: "/activities",
	} as const,
	post: {
		post: "/",
		postRecurring: "/recurring",
	} as const,
	put: {
		putActivity: "/:activity_id",
		putTaskCompletion: "/task/completion",
	} as const,
	delete: {} as const,
} satisfies SubService;

const recurrence = {
	get: {
		getRecurrencesByUser: "/recur",
		getOccurrencesByUser: "/recur/occurrences",
		getRecurrenceByActivity: "/recur/activity/:activity_id/recurrence",
		getOccurrencesByRecurrence: "/recur/:recurrence_id/occurrences",
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

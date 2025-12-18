import {
	deleteOccurrenceByIdMutation,
	deleteRecurrenceByIdMutation,
} from "@/lib/trpc/resolvers/activity/delete-recurrences";
import {
	createActivityMutation,
	createRealSyntheticActivityMutation,
	createRecurringActivityMutation,
} from "@/lib/trpc/resolvers/activity/insert-activities";
import {
	createOccurrenceMutation,
	createRecurrenceMutation,
} from "@/lib/trpc/resolvers/activity/insert-recurrences";
import {
	activitiesQuery,
	recurringActivitiesQuery,
} from "@/lib/trpc/resolvers/activity/query-activities";
import {
	occurrencesByRecurrenceQuery,
	occurrencesByUserQuery,
	recurrenceByActivityQuery,
	recurrencesByIdQuery,
	recurrencesByUserQuery,
} from "@/lib/trpc/resolvers/activity/query-recurrences";
import {
	updateActivityMutation,
	updateTaskCompletionMutation,
} from "@/lib/trpc/resolvers/activity/update-activities";
import {
	updateOccurrenceMutation,
	updateRecurrenceMutation,
} from "@/lib/trpc/resolvers/activity/update-recurrences";
import { t } from "@/lib/trpc/trpc-context";
import { deleteActivityByIdMutation } from "../resolvers/activity/delete-activity";
import { overdueTasksQuery } from "../resolvers/activity/query-tasks";

export const activitiesRouter = t.router({
	all: activitiesQuery,
	delete: {
		byId: deleteActivityByIdMutation,
	},
	recurring: recurringActivitiesQuery,
	create: createActivityMutation,
	createRecurring: createRecurringActivityMutation,
	createFromSynthetic: createRealSyntheticActivityMutation,
	update: updateActivityMutation,
	updateCompletion: updateTaskCompletionMutation,
	recurrences: {
		all: recurrencesByUserQuery,
		queryByActivity: recurrenceByActivityQuery,
		queryById: recurrencesByIdQuery,
		create: createRecurrenceMutation,
		delete: deleteRecurrenceByIdMutation,
		update: updateRecurrenceMutation,
	},
	occurrences: {
		queryByRecurrence: occurrencesByRecurrenceQuery,
		all: occurrencesByUserQuery,
		create: createOccurrenceMutation,
		delete: deleteOccurrenceByIdMutation,
		update: updateOccurrenceMutation,
	},
	tasks: {
		overdue: overdueTasksQuery,
	},
});

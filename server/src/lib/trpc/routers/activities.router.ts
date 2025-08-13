import {
	deleteOccurrenceById,
	deleteRecurrenceById,
} from "@/lib/trpc/resolvers/activity/delete-recurrences";
import {
	createActivity,
	createRealSyntheticActivity,
	createRecurringActivity,
} from "@/lib/trpc/resolvers/activity/insert-activities";
import {
	_createRecurrence,
	createOccurrence,
} from "@/lib/trpc/resolvers/activity/insert-recurrences";
import {
	queryActivities,
	queryRecurringActivities,
} from "@/lib/trpc/resolvers/activity/query-activities";
import {
	_getRecurrenceByActivity,
	_getRecurrencesByUser,
	_queryOccurrencesByRecurrence,
	_queryOccurrencesByUser,
	getRecurrencesById,
} from "@/lib/trpc/resolvers/activity/query-recurrences";
import {
	updateActivity,
	updateTaskCompletion,
} from "@/lib/trpc/resolvers/activity/update-activities";
import {
	_updateOccurrence,
	_updateRecurrence,
} from "@/lib/trpc/resolvers/activity/update-recurrences";
import { t } from "@/lib/trpc/trpc-context";
import { queryOverdueTasks } from "../resolvers/activity/query-tasks";

export const activityRouter = t.router({
	all: queryActivities,
	recurring: queryRecurringActivities,
	create: createActivity,
	createRecurring: createRecurringActivity,
	createFromSynthetic: createRealSyntheticActivity,
	update: updateActivity,
	updateCompletion: updateTaskCompletion,
	recurrences: {
		all: _getRecurrencesByUser,
		queryByActivity: _getRecurrenceByActivity,
		queryById: getRecurrencesById,
		create: _createRecurrence,
		delete: deleteRecurrenceById,
		update: _updateRecurrence,
	},
	occurrences: {
		queryByRecurrence: _queryOccurrencesByRecurrence,
		queryByUser: _queryOccurrencesByUser,
		create: createOccurrence,
		delete: deleteOccurrenceById,
		update: _updateOccurrence,
	},
	tasks: {
		overdue: queryOverdueTasks,
	},
});

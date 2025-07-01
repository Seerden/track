import {
	deleteOccurrenceById,
	deleteRecurrenceById,
} from "@/lib/trpc/resolvers/activity/delete-recurrences";
import { createActivity } from "@/lib/trpc/resolvers/activity/insert-activities";
import {
	_createRecurrence,
	createOccurrence,
} from "@/lib/trpc/resolvers/activity/insert-recurrences";
import { queryActivities } from "@/lib/trpc/resolvers/activity/query-activities";
import {
	_getRecurrenceByActivity,
	_getRecurrencesByUser,
	_queryOccurrencesByRecurrence,
	_queryOccurrencesByUser,
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

export const activityRouter = t.router({
	all: queryActivities,
	create: createActivity,
	update: updateActivity,
	updateCompletion: updateTaskCompletion,
	recurrences: {
		queryByUser: _getRecurrencesByUser,
		queryByActivity: _getRecurrenceByActivity,
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
});

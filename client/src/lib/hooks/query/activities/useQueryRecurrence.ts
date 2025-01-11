import activityService from "@/lib/fetch/activity-service";
import q from "@/lib/hooks/query/use-query-with-defaults";
import { qk } from "@/lib/query-keys";
import type { ID } from "@shared/types/data/utility.types";
import type { UseQueryResult } from "@tanstack/react-query";

type Query = keyof typeof activityService.recurrence.get;

type QueryHooks = {
	[K in Query]: (
		...args: Parameters<(typeof activityService.recurrence.get)[K]>
	) => UseQueryResult<Awaited<ReturnType<(typeof activityService.recurrence.get)[K]>>>;
};

type QueryHook = QueryHooks[keyof QueryHooks];

export const useQueryOccurrencesByRecurrence: QueryHook = (recurrence_id: ID) =>
	q(qk.occurrences.byRecurrence(recurrence_id), () =>
		activityService.recurrence.get.getOccurrencesByRecurrence(recurrence_id)
	);

export const useQueryOccurrencesByUser: QueryHook = () =>
	q(qk.occurrences.byUser, activityService.recurrence.get.getOccurrencesByUser);

export const useQueryRecurrencesByUser: QueryHook = () =>
	q(qk.recurrences.byUser, activityService.recurrence.get.getRecurrencesByUser);

export const useQueryRecurrenceByActivity: QueryHook = (activity_id: ID) =>
	q(qk.recurrences.byActivity(activity_id), () =>
		activityService.recurrence.get.getRecurrenceByActivity(activity_id)
	);

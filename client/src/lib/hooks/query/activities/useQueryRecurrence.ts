import activityService from "@/lib/fetch/activity-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ID } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export const useQueryOccurrencesByRecurrence = (recurrence_id: ID) =>
	useQuery({
		queryKey: qk.occurrences.byRecurrence(recurrence_id),
		queryFn: () =>
			activityService.recurrence.get.getOccurrencesByRecurrence(recurrence_id),
		...defaultQueryConfig
	});

export const useQueryOccurrencesByUser = () =>
	useQuery({
		queryKey: qk.occurrences.byUser,
		queryFn: activityService.recurrence.get.getOccurrencesByUser,
		...defaultQueryConfig
	});

export const useQueryRecurrencesByUser = () =>
	useQuery({
		queryKey: qk.recurrences.byUser,
		queryFn: activityService.recurrence.get.getRecurrencesByUser,
		...defaultQueryConfig
	});

export const useQueryRecurrenceByActivity = (activity_id: ID) =>
	useQuery({
		queryKey: qk.recurrences.byActivity(activity_id),
		queryFn: () => activityService.recurrence.get.getRecurrenceByActivity(activity_id),
		...defaultQueryConfig
	});

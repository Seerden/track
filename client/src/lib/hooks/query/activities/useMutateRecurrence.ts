import activityService from "@/lib/fetch/activity-service";
import useMutation from "@/lib/hooks/query/use-typed-mutation";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type {
	NewOccurrenceInput,
	NewRecurrenceInput,
	OccurrenceInput,
	RecurrenceInput
} from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";

export const useMutateNewRecurrence = () =>
	useMutation(
		(recurrenceInput: NewRecurrenceInput) =>
			activityService.recurrence.post.postRecurrence(recurrenceInput),
		() => {
			// TODO: also invalidate activities?
			queryClient.invalidateQueries({
				queryKey: qk.recurrences.byUser
			});
		}
	);

export const useMutateNewOccurrence = () =>
	useMutation(
		(occurrenceInput: NewOccurrenceInput) =>
			activityService.recurrence.post.postOccurrence(occurrenceInput),
		() => {
			queryClient.invalidateQueries({
				// TODO: depending on how we implement synthetic activities, may
				// need to also invalidate activities.
				queryKey: qk.occurrences.byUser
			});
		}
	);

export const useMutateUpdateRecurrence = () => {
	return useMutation(
		(recurrenceInput: RecurrenceInput) =>
			activityService.recurrence.put.putRecurrence(recurrenceInput),
		() => {
			// TODO: refine this
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
			queryClient.invalidateQueries({
				queryKey: qk.recurrences.byUser
			});
		}
	);
};

export const useMutateUpdateOccurrence = () => {
	return useMutation(
		(occurrenceInput: OccurrenceInput) =>
			activityService.recurrence.put.putOccurrence(occurrenceInput),
		() => {
			// TODO: refine this
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
			queryClient.invalidateQueries({
				queryKey: qk.occurrences.byUser
			});
		}
	);
};

export const useMutateDeleteRecurrence = () => {
	return useMutation(
		(recurrence_id: ID) =>
			activityService.recurrence.delete.deleteRecurrence(recurrence_id),
		() => {
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
		}
	);
};

export const useMutateDeleteOccurrence = () => {
	return useMutation(
		(occurrence_id: ID) =>
			activityService.recurrence.delete.deleteOccurrence(occurrence_id),
		() => {
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
		}
	);
};

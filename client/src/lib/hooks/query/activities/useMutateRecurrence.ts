import activityService from "@/lib/fetch/activity-service";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type {
	NewOccurrenceInput,
	NewRecurrenceInput,
	OccurrenceInput,
	RecurrenceInput
} from "@shared/types/data/recurrence.types";
import type { ID } from "@shared/types/data/utility.types";
import { useMutation } from "@tanstack/react-query";

export const useMutateNewRecurrence = () =>
	useMutation({
		mutationFn: (recurrenceInput: NewRecurrenceInput) =>
			activityService.recurrence.post.postRecurrence(recurrenceInput),
		onSuccess: () => {
			// TODO: also invalidate activities?
			queryClient.invalidateQueries({
				queryKey: qk.recurrences.byUser
			});
		}
	});

export const useMutateNewOccurrence = () =>
	useMutation({
		mutationFn: (occurrenceInput: NewOccurrenceInput) =>
			activityService.recurrence.post.postOccurrence(occurrenceInput),
		onSuccess: () => {
			queryClient.invalidateQueries({
				// TODO: depending on how we implement synthetic activities, may
				// need to also invalidate activities.
				queryKey: qk.occurrences.byUser
			});
		}
	});

export const useMutateUpdateRecurrence = () => {
	return useMutation({
		mutationFn: (recurrenceInput: RecurrenceInput) =>
			activityService.recurrence.put.putRecurrence(recurrenceInput),
		onSuccess: () => {
			// TODO: refine this
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
			queryClient.invalidateQueries({
				queryKey: qk.recurrences.byUser
			});
		}
	});
};

export const useMutateUpdateOccurrence = () => {
	return useMutation({
		mutationFn: (occurrenceInput: OccurrenceInput) =>
			activityService.recurrence.put.putOccurrence(occurrenceInput),
		onSuccess: () => {
			// TODO: refine this
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
			queryClient.invalidateQueries({
				queryKey: qk.occurrences.byUser
			});
		}
	});
};

export const useMutateDeleteRecurrence = () => {
	return useMutation({
		mutationFn: (recurrence_id: ID) =>
			activityService.recurrence.delete.deleteRecurrence(recurrence_id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
		}
	});
};

export const useMutateDeleteOccurrence = () => {
	return useMutation({
		mutationFn: (occurrence_id: ID) =>
			activityService.recurrence.delete.deleteOccurrence(occurrence_id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: qk.activities.all
			});
		}
	});
};

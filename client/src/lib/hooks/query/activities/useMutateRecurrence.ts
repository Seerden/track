import activityService from "@/lib/fetch/activity-service";
import useMutation from "@/lib/hooks/query/use-typed-mutation";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type {
	NewOccurrenceInput,
	NewRecurrenceInput
} from "@shared/types/data/recurrence.types";
import { type UseMutationResult } from "@tanstack/react-query";

type PostMutation = keyof typeof activityService.recurrence.post;

type PostMutationHooks = {
	[K in PostMutation]: (
		...args: Parameters<(typeof activityService.recurrence.post)[K]>
	) => UseMutationResult<
		Awaited<ReturnType<(typeof activityService.recurrence.post)[K]>>,
		Error,
		Parameters<(typeof activityService.recurrence.post)[K]>[0]
	>;
};

type PostMutationHook = PostMutationHooks[keyof PostMutationHooks];

export const useMutateNewRecurrence: PostMutationHook = () =>
	useMutation(
		(recurrenceInput: NewRecurrenceInput) => {
			return activityService.recurrence.post.postRecurrence(recurrenceInput);
		},
		() => {
			queryClient.invalidateQueries({
				queryKey: qk.recurrences.byUser
			});
			// TODO: also invalidate activities?
		}
	);

export const useMutateNewOccurrence: PostMutationHook = () =>
	useMutation(
		(occurrenceInput: NewOccurrenceInput) => {
			return activityService.recurrence.post.postOccurrence(occurrenceInput);
		},
		() => {
			queryClient.invalidateQueries({
				queryKey: qk.occurrences.byUser
				// TODO: depending on how we implement synthetic activities, may
				// need to also invalidate activities.
			});
		}
	);

import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";
import { invalidateActivities } from "../invalidate";

export function useMutateNewActivity() {
	return useMutation(
		trpc.activities.create.mutationOptions({
			// TODO: the onSuccess handlers in this file are the same right now,
			// but I can see a situation where they diverge in the future, so I'm
			// not gonna abstract them into a single onSuccess function.
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
}

export function useMutateNewRecurringActivity() {
	return useMutation(
		trpc.activities.createRecurring.mutationOptions({
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
}

/** Mutation hook that turns a synthetic activity into a real one. */
export function useMutateNewSyntheticActivity() {
	return useMutation(
		trpc.activities.createFromSynthetic.mutationOptions({
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
}

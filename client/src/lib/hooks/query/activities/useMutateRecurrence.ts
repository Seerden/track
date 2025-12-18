import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { invalidateActivities } from "../invalidate";

// TODO: these functions aren't used yet. Once they are, consider using or
// expanding invalidateActivities here, depending on the implementation details
// of these hooks.

export const useMutateNewRecurrence = () =>
	useMutation(
		trpc.activities.recurrences.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.recurrences.all.queryKey(),
				});
			},
		})
	);

export const useMutateNewOccurrence = () =>
	useMutation(
		trpc.activities.occurrences.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.occurrences.all.queryKey(),
				});
			},
		})
	);

export const useMutateUpdateRecurrence = () => {
	return useMutation(
		trpc.activities.recurrences.update.mutationOptions({
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
};

export const useMutateUpdateOccurrence = () => {
	return useMutation(
		trpc.activities.recurrences.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.occurrences.all.queryKey(),
				});
			},
		})
	);
};

export const useMutateDeleteRecurrence = () => {
	return useMutation(
		trpc.activities.recurrences.delete.mutationOptions({
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
};

export const useMutateDeleteOccurrence = () => {
	return useMutation(
		trpc.activities.occurrences.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.occurrences.all.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey(),
				});
			},
		})
	);
};

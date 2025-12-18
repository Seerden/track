import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { invalidateActivities } from "../invalidate";

// TODO: these functions aren't used yet. Once they are, consider using or
// expanding invalidateActivities here, depending on the implementation details
// of these hooks.

export const useMutateNewRecurrence = () =>
	useMutation(
		trpc.activities.m.recurrences.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.recurrences.all.queryKey(),
				});
			},
		})
	);

export const useMutateNewOccurrence = () =>
	useMutation(
		trpc.activities.m.occurrences.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.occurrences.all.queryKey(),
				});
			},
		})
	);

export const useMutateUpdateRecurrence = () => {
	return useMutation(
		trpc.activities.m.recurrences.update.mutationOptions({
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
};

export const useMutateUpdateOccurrence = () => {
	return useMutation(
		trpc.activities.m.recurrences.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.all.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.occurrences.all.queryKey(),
				});
			},
		})
	);
};

export const useMutateDeleteRecurrence = () => {
	return useMutation(
		trpc.activities.m.recurrences.delete.mutationOptions({
			onSuccess: () => {
				invalidateActivities();
			},
		})
	);
};

export const useMutateDeleteOccurrence = () => {
	return useMutation(
		trpc.activities.m.occurrences.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.occurrences.all.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.all.queryKey(),
				});
			},
		})
	);
};

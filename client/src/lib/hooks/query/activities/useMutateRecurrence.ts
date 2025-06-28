import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

export const useMutateNewRecurrence = () =>
	useMutation(
		trpc.activities.recurrences.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.recurrences.queryByUser.queryKey()
				});
			}
		})
	);

export const useMutateNewOccurrence = () =>
	useMutation(
		trpc.activities.occurrences.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.occurrences.queryByUser.queryKey()
				});
			}
		})
	);

export const useMutateUpdateRecurrence = () => {
	return useMutation(
		trpc.activities.recurrences.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.recurrences.queryByUser.queryKey()
				});
			}
		})
	);
};

export const useMutateUpdateOccurrence = () => {
	return useMutation(
		trpc.activities.recurrences.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.occurrences.queryByUser.queryKey()
				});
			}
		})
	);
};

export const useMutateDeleteRecurrence = () => {
	return useMutation(
		trpc.activities.recurrences.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.recurrences.queryByUser.queryKey()
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
			}
		})
	);
};

export const useMutateDeleteOccurrence = () => {
	return useMutation(
		trpc.activities.occurrences.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.occurrences.queryByUser.queryKey()
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
			}
		})
	);
};

import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

export function useMutateNewActivity() {
	return useMutation(
		trpc.activities.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
			}
		})
	);
}

export function useMutateNewRecurringActivity() {
	return useMutation(
		trpc.activities.createRecurring.mutationOptions({
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
}

export function useMutateNewSyntheticActivity() {
	return useMutation(
		trpc.activities.createFromSynthetic.mutationOptions({
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
}

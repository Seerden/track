import { useMutation, useQueryClient } from "@tanstack/react-query";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export function useDeleteTagMutation() {
	const { closeModal } = useModalState();

	const queryClient = useQueryClient();
	const mutation = useMutation(
		trpc.tags.m.delete.mutationOptions({
			onSuccess: () => {
				// invaldate queries - TODO (TRK-134) refine this
				queryClient.invalidateQueries({
					queryKey: trpc.tags.q.pathKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.activities.q.pathKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.pathKey(),
				});

				closeModal(modalIds.tags.detailed);
			},
		})
	);

	return mutation;
}

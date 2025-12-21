import { useMutation, useQueryClient } from "@tanstack/react-query";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export function useMutateUpdateHabit() {
	const queryClient = useQueryClient();
	const { closeModal } = useModalState();

	return useMutation(
		trpc.habits.m.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.pathKey(),
				});

				// if the edit modal was opened, close it
				closeModal(modalIds.habits.update);
			},
		})
	);
}

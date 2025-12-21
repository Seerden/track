import { useMutation, useQueryClient } from "@tanstack/react-query";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export default function useMutateDeleteHabit() {
	const queryClient = useQueryClient();
	const { closeModal } = useModalState();

	return useMutation(
		trpc.habits.m.delete.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.all.queryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: trpc.habits.q.entries.queryKey(),
				});
				closeModal(modalIds.habits.detailed);
			},
		})
	);
}

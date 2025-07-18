import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";

export function useTask(activity: ActivityWithIds) {
	const putCompletion = usePutTaskCompletion(activity);
	const { openDetailedItemModal } = useDetailedItemModal(
		"activity",
		modalIds.detailedActivity
	);

	function handleModalOpen(e: React.MouseEvent) {
		e.stopPropagation();
		openDetailedItemModal(activity.activity_id);
	}

	return {
		handleModalOpen,
		putCompletion
	} as const;
}

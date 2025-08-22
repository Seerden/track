import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";

export function useTask(activity: PossiblySyntheticActivity) {
	const putCompletion = usePutTaskCompletion(activity);
	const { openDetailedItemModal } = useDetailedItemModal(
		"activity",
		modalIds.detailedActivity
	);

	function handleModalOpen(e: React.MouseEvent) {
		e.stopPropagation();
		openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
	}

	return {
		handleModalOpen,
		putCompletion,
	} as const;
}

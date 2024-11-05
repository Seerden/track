import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ActivityWithIds } from "@/types/server/activity.types";

export function useDetailedActivityModal(activity: ActivityWithIds) {
	const { setModalState } = useModalState(modalIds.detailedActivity);

	function openDetailedActivityModal() {
		setModalState(() => ({
			isOpen: true,
			itemId: activity.activity_id,
			itemType: "activity"
		}));
	}

	return { openDetailedActivityModal };
}

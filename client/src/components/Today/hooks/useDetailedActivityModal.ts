import modalIds from "@/lib/modal-ids";
import { activeItemState } from "@/lib/state/active-item-state";
import { useModalState } from "@/lib/state/modal-state";
import type { ActivityWithIds } from "@t/data/activity.types";
import { useSetRecoilState } from "recoil";

export function useDetailedActivityModal(activity: ActivityWithIds) {
	const { openModal } = useModalState();
	const setActiveItem = useSetRecoilState(activeItemState);

	function openDetailedActivityModal() {
		setActiveItem(activity.activity_id);
		openModal(modalIds.detailedActivity);
	}

	return { openDetailedActivityModal };
}

import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { ID, Maybe } from "@t/data/utility.types";
import { atom, useSetRecoilState } from "recoil";

export const activeItemState = atom<Maybe<ID>>({
	key: "activeItemState",
	default: null
});

export function useDetailedActivityModal(activity: ActivityWithIds) {
	const { openModal } = useModalState();
	const setActiveItem = useSetRecoilState(activeItemState);

	function openDetailedActivityModal() {
		setActiveItem(activity.activity_id);
		openModal(modalIds.detailedActivity);
	}

	return { openDetailedActivityModal };
}

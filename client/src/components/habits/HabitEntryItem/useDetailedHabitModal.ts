// This is basically the same as useDetailedActivityModal.ts, but for habits.
// Abstract that to a useDetailModal or something. We never want to stack those
// modals anyway, so they can share the same modal id (I was already using
// modalIds.detailedActivity for both anyway).

import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { Habit } from "@/types/server/habit.types";
import type { ID } from "@/types/server/utility.types";
import { atom, useRecoilState } from "recoil";

export const activeHabitIdState = atom<ID | null>({
	default: null,
	key: "active-habit-id"
});

export default function useDetailedHabitModal() {
	const [activeHabitId, setActiveHabitId] = useRecoilState(activeHabitIdState);
	const { openModal } = useModalState();

	function openDetailedHabitModal(id: Habit["habit_id"]) {
		setActiveHabitId(id);
		openModal(modalIds.detailedActivity); // TODO: generalize this as describe at the top of this file
	}

	return {
		openDetailedHabitModal,
		activeHabitId
	};
}

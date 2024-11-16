// This is basically the same as useDetailedActivityModal.ts, but for habits.
// Abstract that to a useDetailModal or something. We never want to stack those
// modals anyway, so they can share the same modal id (I was already using
// modalIds.detailedActivity for both anyway).

import useHabitsData from "@/lib/hooks/useHabitsData";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { Habit, HabitWithEntries } from "@/types/server/habit.types";
import type { ID } from "@/types/server/utility.types";
import { useMemo } from "react";
import { atom, useRecoilState } from "recoil";

type WithActiveHabit = {
	shouldShowModal: true;
	activeHabitId: ID;
	activeHabit: HabitWithEntries;
};

type WithoutActiveHabit = {
	shouldShowModal: false;
	activeHabitId: null;
	activeHabit: null;
};

type Return = (WithActiveHabit | WithoutActiveHabit) & {
	modalId: string;
	openDetailedHabitModal: (id: Habit["habit_id"]) => void;
};

export const activeHabitIdState = atom<ID | null>({
	default: null,
	key: "active-habit-id"
});

export default function useDetailedHabitModal() {
	const [activeHabitId, setActiveHabitId] = useRecoilState(activeHabitIdState);
	const { openModal } = useModalState();

	const { habitsWithEntriesById } = useHabitsData();
	const shouldShowModal = (activeHabitId !== null) as true | false;
	const modalId = modalIds.habits.detailed;
	function openDetailedHabitModal(id: Habit["habit_id"]) {
		setActiveHabitId(id);
		openModal(modalId); // TODO: generalize this as describe at the top of this file
	}

	const activeHabit = useMemo(() => {
		if (!activeHabitId) return null;

		return habitsWithEntriesById[activeHabitId];
	}, [activeHabitId]);

	return {
		shouldShowModal,
		modalId,
		activeHabitId,
		activeHabit,
		openDetailedHabitModal
	} as Return;
}

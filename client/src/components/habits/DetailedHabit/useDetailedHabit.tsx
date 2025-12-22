import type { HabitWithEntries } from "@shared/lib/schemas/habit";
import { useAtomValue } from "jotai";
import type { MouseEvent } from "react";
import { createDate } from "@/lib/datetime/make-date";
import useMutateDeleteHabit from "@/lib/hooks/query/habits/useMutateDeleteHabit";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import useHabitsData from "@/lib/hooks/useHabitsData";
import modalIds from "@/lib/modal-ids";
import { timeWindowAtom } from "@/lib/state/time-window.state";

export function useDetailedHabit(existingHabit: HabitWithEntries) {
	const { data: tags } = useQueryTags();
	// NOTE: we do not use getHabitsForTimeWindow, because for the habit
	// calendar, we want to create synthetic habits for potentially any date.
	const { getHabitById } = useHabitsData();
	const habit = getHabitById(existingHabit.habit_id);

	if (!habit) {
		// TODO: sentry
		throw new Error(`Habit with id ${existingHabit.habit_id} not found`);
	}

	const { openDetailedItemModal } = useDetailedItemModal(
		"tag",
		modalIds.tags.detailed
	);
	const timeWindow = useAtomValue(timeWindowAtom);

	const humanizedStart = createDate(habit.start_timestamp).fromNow();
	const humanizedEnd = habit.end_timestamp
		? createDate(habit.end_timestamp).fromNow()
		: null;
	const humanizedFrequency = `${habit.frequency} time(s) per ${habit.interval} ${habit.interval_unit}(s)`; // TODO: consider using frequencyString from elsewhere

	const { mutate } = useMutateDeleteHabit();

	function handleDeleteHabit(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		// TODO: notification
		if (!habit) return;

		mutate(habit.habit_id);
	}

	return {
		habit,
		handleDeleteHabit,
		humanizedFrequency,
		humanizedStart,
		humanizedEnd,
		tags,
		openDetailedItemModal,
		timeWindow,
	} as const;
}

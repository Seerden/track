import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import HabitEntryItems from "@/components/habits/HabitEntryItem/HabitEntryItems";
import { withSyntheticHabitEntries } from "@/components/habits/HabitEntryItem/synthetic";
import { createDate } from "@/lib/datetime/make-date";
import useHabitsData from "@/lib/hooks/useHabitsData";
import type { TimeWindow } from "@/types/time-window.types";
import { useMemo } from "react";

// TODO this is just a placeholder
const timeWindow: TimeWindow = {
	type: "day",
	startDate: createDate(new Date()).startOf("day"),
	endDate: createDate(new Date()).add(2, "day")
};

function Home() {
	const { habitsWithEntriesById } = useHabitsData();

	if (!habitsWithEntriesById) return null;
	const _habits = useMemo(() => {
		return withSyntheticHabitEntries(habitsWithEntriesById, timeWindow);
	}, [habitsWithEntriesById, timeWindow]);

	const habitList = Object.values(_habits);
	if (!habitList.length) return null;

	return (
		<>
			<DetailedHabit habit={habitList[0]} />
			simulating daily view
			<HabitEntryItems habits={_habits} />
		</>
	);
}

export default Home;

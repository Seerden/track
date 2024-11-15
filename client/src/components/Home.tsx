import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import Habits from "@/components/habits/HabitEntryItem/Habits";
import { withSyntheticHabitEntries } from "@/components/habits/HabitEntryItem/synthetic";
import { createDate } from "@/lib/datetime/make-date";
import useHabitsData from "@/lib/hooks/useHabitsData";
import type { TimeWindow } from "@/types/time-window.types";
import { useMemo } from "react";

// TODO this is just a placeholder
const timeWindow: TimeWindow = {
	intervalUnit: "day",
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
			<Habits habits={_habits} />
		</>
	);
}

export default Home;

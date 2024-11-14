import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import HabitEntryItems from "@/components/habits/HabitEntryItem/HabitEntryItems";
import { withSyntheticHabitEntries } from "@/components/habits/HabitEntryItem/synthetic";
import { createDate } from "@/lib/datetime/make-date";
import useHabitsData from "@/lib/hooks/useHabitsData";
import type { Timescale } from "@/types/timescale.types";
import { useEffect } from "react";

// TODO this is just a placeholder
const timescale: Timescale = {
	type: "day",
	startDate: createDate(new Date()).startOf("day"),
	endDate: createDate(new Date()).add(2, "day")
};

function Home() {
	const habitsWithEntriesById = useHabitsData();

	useEffect(() => {
		console.log({
			habitsWithEntriesById
		});
	}, [habitsWithEntriesById]);

	if (!habitsWithEntriesById) return null;
	const _habits = withSyntheticHabitEntries(habitsWithEntriesById, timescale);

	const habitList = Object.values(_habits);
	if (!habitList.length) return null;

	return (
		<>
			<DetailedHabit habit={habitList[0]} />
			simulating daily view
			<HabitEntryItems timescale={timescale} habits={_habits} />
		</>
	);
}

export default Home;

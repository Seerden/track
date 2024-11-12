import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import { habit } from "@/components/habits/DetailedHabit/mock";
import HabitEntryItem from "@/components/habits/HabitEntryItem/HabitEntryItem";

function Home() {
	return (
		<>
			<DetailedHabit habit={habit} />
			<HabitEntryItem habit={{ ...habit, entries: {} }} />
		</>
	);
}

export default Home;

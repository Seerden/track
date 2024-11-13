import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import { booleanHabit, habit } from "@/components/habits/DetailedHabit/mock";
import HabitEntryItems from "@/components/habits/HabitEntryItem/HabitEntryItems";

function Home() {
	return (
		<>
			<DetailedHabit habit={habit} />
			<HabitEntryItems
				habits={[
					{ ...habit, entries: {} },
					{ ...booleanHabit, entries: {} }
				]}
			/>
		</>
	);
}

export default Home;

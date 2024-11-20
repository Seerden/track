import Habit from "@/components/habits/Habits/Habit";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@t/data/habit.types";
import type { ById } from "@t/data/utility.types";

type HabitsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habits }: HabitsProps) {
	return (
		<L.ItemList
			style={{
				gridTemplateColumns: "max-content max-content auto"
			}}
		>
			{Object.values(habits).map((habit) => (
				<Habit key={habit.habit_id} habit={habit} />
			))}
		</L.ItemList>
	);
}

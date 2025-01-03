import Habit from "@/components/habits/Habits/Habit";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@shared/types/data/habit.types";
import type { ById } from "@shared/types/data/utility.types";

type HabitsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habits }: HabitsProps) {
	return (
		<L.ItemList
			style={{
				// these columns refer to: title, frequency, completion, expand
				// button (which is hidden until hovered)
				gridTemplateColumns: "max-content max-content auto 40px"
			}}
		>
			{Object.values(habits).map((habit) => (
				<Habit key={habit.habit_id} habit={habit} />
			))}
		</L.ItemList>
	);
}

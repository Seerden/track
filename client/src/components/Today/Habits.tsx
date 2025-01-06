import Habit from "@/components/Today/Habit";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@shared/types/data/habit.types";
import type { ById } from "@shared/types/data/utility.types";
import S from "./style/Habits.style";
import T from "./style/Today.style";

type HabitsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habits }: HabitsProps) {
	return (
		// TODO: is the grid-area not already being set in the style file?
		<S.Habits style={{ gridArea: "habits" }}>
			<T.BlockTitle>Habits</T.BlockTitle>
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
		</S.Habits>
	);
}

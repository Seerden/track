import Empty from "@/components/Today/Empty";
import Habit from "@/components/Today/Habit";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { ById } from "@shared/types/data/utility.types";
import S from "./style/Habits.style";
import T from "./style/Today.style";

type HabitsProps = {
	habitsById: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habitsById }: HabitsProps) {
	const habits = Object.values(habitsById);
	const { openModal } = useModalState();

	return (
		<S.Habits>
			<T.BlockTitle>Habits</T.BlockTitle>

			{habits.length > 0 ? (
				<L.ItemList
					style={{
						// these columns refer to: title, frequency, completion, expand
						// button (which is hidden until hovered)
						gridTemplateColumns: "max-content max-content auto 40px"
					}}
				>
					{habits.map((habit) => (
						<Habit key={habit.habit_id} habit={habit} />
					))}
				</L.ItemList>
			) : (
				<Empty action={() => openModal(modalIds.habits.new)}>
					<span>No habits found for today. </span>
				</Empty>
			)}
		</S.Habits>
	);
}

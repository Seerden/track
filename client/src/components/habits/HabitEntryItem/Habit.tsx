import Completion from "@/components/habits/HabitEntryItem/Completion";
import { frequencyString } from "@/components/habits/HabitEntryItem/frequency-string";
import useDetailedHabitModal from "@/components/habits/HabitEntryItem/useDetailedHabitModal";
import useHabitDeleteMutation from "@/lib/query/habits/useDeleteHabitMutation";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@/types/server/habit.types";
import S from "./style/Habit.style";

type HabitProps = {
	habit: HabitWithPossiblySyntheticEntries;
};

export default function Habit({ habit }: HabitProps) {
	const { mutate } = useHabitDeleteMutation();
	const { openDetailedHabitModal } = useDetailedHabitModal();

	return (
		<S.Wrapper
			onClick={(e) => {
				// TODO: this onClick also triggers when the user clicks a child
				// element, like a checkbox. We don't want that. In Task, we have an
				// e.stopPropagation() on the checkbox wrapper to prevent this. We'd
				// also need to do the same to the slider wrapper.. bit hacky, maybe
				// just trigger modal open on button click instead of the whole item.
				e.stopPropagation();
				openDetailedHabitModal(habit.habit_id);
			}}
		>
			<L.ItemName>{habit.name}</L.ItemName>
			<L.Info>{frequencyString(habit)}</L.Info>
			<S.CompletionWrapper>
				<Completion habit={habit} entries={habit.entries} />
			</S.CompletionWrapper>
		</S.Wrapper>
	);
}

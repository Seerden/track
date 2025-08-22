import Completion from "@/components/habits/Habits/Completion";
import { frequencyString } from "@/components/habits/Habits/frequency-string";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import S from "./style/Habit.style";

type HabitProps = {
	habit: HabitWithPossiblySyntheticEntries;
};

export default function Habit({ habit }: HabitProps) {
	// const { mutate } = useHabitDeleteMutation();
	const { openDetailedItemModal } = useDetailedItemModal(
		"habit",
		modalIds.habits.detailed
	);

	return (
		<S.Wrapper>
			{/* TODO: tooltip or a thing somewhere that indicates that clicking 
            the habit name expands the card into a modal */}
			<Buttons.Unstyled
				onClick={(e) => {
					e.stopPropagation();
					openDetailedItemModal(habit.habit_id);
				}}>
				<L.ItemName>{habit.name}</L.ItemName>
			</Buttons.Unstyled>
			<L.Info>{frequencyString(habit)}</L.Info>
			<S.CompletionWrapper>
				<Completion habit={habit} entries={habit.entries} />
			</S.CompletionWrapper>
		</S.Wrapper>
	);
}

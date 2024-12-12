import Completion from "@/components/habits/Habits/Completion";
import { frequencyString } from "@/components/habits/Habits/frequency-string";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import modalIds from "@/lib/modal-ids";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@t/data/habit.types";
import { LucideMaximize2 } from "lucide-react";
import { useState } from "react";
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
	const [showExpand, setShowExpand] = useState(false);

	return (
		<S.Wrapper
			// TODO: make keyboard-interactable with tabIndex, onFocus and onBlur
			onMouseEnter={() => setShowExpand(true)}
			onMouseLeave={() => setShowExpand(false)}
			onClick={(e) => {
				// TODO: this onClick also triggers when the user clicks a child
				// element, like a checkbox. We don't want that. In Task, we have an
				// e.stopPropagation() on the checkbox wrapper to prevent this. We'd
				// also need to do the same to the slider wrapper.. bit hacky, maybe
				// just trigger modal open on button click instead of the whole item.
				e.stopPropagation();
				// openDetailedItemModal(habit.habit_id);
			}}
		>
			<L.ItemName>{habit.name}</L.ItemName>
			<L.Info>{frequencyString(habit)}</L.Info>
			<S.CompletionWrapper>
				<Completion habit={habit} entries={habit.entries} />
			</S.CompletionWrapper>
			{showExpand && (
				<S.ExpandButton
					onClick={(e) => {
						e.stopPropagation();
						openDetailedItemModal(habit.habit_id);
					}}
				>
					<LucideMaximize2 size={15} />
				</S.ExpandButton>
			)}
		</S.Wrapper>
	);
}

import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { MapById } from "@shared/types/data/utility.types";
import { AnimatePresence, motion } from "motion/react";
import BlockHeader from "@/components/Today/BlockHeader";
import Empty from "@/components/Today/Empty";
import Habit from "@/components/Today/habits/Habit";
import { useHabits } from "@/components/Today/habits/useHabits";
import Today, {
	filterableContainer,
} from "@/components/Today/style/Today.style";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import S from "./style/Habits.style";

export default function Habits({
	habits,
}: {
	habits: MapById<HabitWithPossiblySyntheticEntries>;
}) {
	const { showFilter, habitsList, filteredHabits, headerProps } =
		useHabits(habits);
	const { openModal } = useModalState();

	return (
		<S.Habits>
			<BlockHeader {...headerProps} />

			{habitsList.length > 0 ? (
				// TODO: instead of this animation, I want to make the filter extend
				// around the title the way we do with the tagselector actionbar.
				<motion.div {...filterableContainer(showFilter)}>
					<Today.Section>
						<AnimatePresence>
							{filteredHabits.map((habit) => (
								<Habit key={habit.habit_id} habit={habit} />
							))}
						</AnimatePresence>
					</Today.Section>
				</motion.div>
			) : (
				<Empty action={() => openModal(modalIds.habits.new)}>
					<span>No habits found for today. </span>
				</Empty>
			)}
		</S.Habits>
	);
}

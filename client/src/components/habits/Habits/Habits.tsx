import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import Habit from "@/components/habits/Habits/Habit";
import Modal from "@/components/utility/Modal/Modal";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import modalIds from "@/lib/modal-ids";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@t/data/habit.types";
import type { ById } from "@t/data/utility.types";

type HabitsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habits }: HabitsProps) {
	const { activeItem, modalId } = useDetailedItemModal(
		"habit",
		modalIds.habits.detailed
	);

	return (
		<>
			<L.ItemList
				style={{
					gridTemplateColumns: "max-content max-content auto"
				}}
			>
				{Object.values(habits).map((habit) => (
					<Habit key={habit.habit_id} habit={habit} />
				))}
			</L.ItemList>

			{activeItem.habit.shouldShowModal && (
				<Modal modalId={modalId} initialOpen={false}>
					<DetailedHabit habit={activeItem.habit.activeItem} />
				</Modal>
			)}
		</>
	);
}

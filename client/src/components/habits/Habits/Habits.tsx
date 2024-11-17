import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import Habit from "@/components/habits/Habits/Habit";
import useDetailedHabitModal from "@/components/habits/Habits/useDetailedHabitModal";
import Modal from "@/components/utility/Modal/Modal";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";

type HabitsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habits }: HabitsProps) {
	const { activeHabit, shouldShowModal, modalId } = useDetailedHabitModal();

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

			{shouldShowModal && (
				<Modal modalId={modalId} initialOpen={false}>
					<DetailedHabit habit={activeHabit} />
				</Modal>
			)}
		</>
	);
}

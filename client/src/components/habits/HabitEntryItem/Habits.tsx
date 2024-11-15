import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import Habit from "@/components/habits/HabitEntryItem/Habit";
import useDetailedHabitModal from "@/components/habits/HabitEntryItem/useDetailedHabitModal";
import Modal from "@/components/Modal";
import useHabitsData from "@/lib/hooks/useHabitsData";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";

type HabitsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function Habits({ habits }: HabitsProps) {
	const { getHabit } = useHabitsData();
	const { activeHabitId, shouldShowModal, modalId } = useDetailedHabitModal();

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
					<DetailedHabit habit={getHabit({ habit_id: activeHabitId })} />
				</Modal>
			)}
		</>
	);
}

import DetailedHabit from "@/components/habits/DetailedHabit/DetailedHabit";
import HabitEntryItem from "@/components/habits/HabitEntryItem/HabitEntryItem";
import { activeHabitIdState } from "@/components/habits/HabitEntryItem/useDetailedHabitModal";
import Modal from "@/components/Modal";
import useHabitsData from "@/lib/hooks/useHabitsData";
import modalIds from "@/lib/modal-ids";
import L from "@/lib/theme/components/List.style";
import type { HabitWithPossiblySyntheticEntries } from "@/types/server/habit.types";
import type { ById } from "@/types/server/utility.types";
import { useRecoilValue } from "recoil";

type HabitEntryItemsProps = {
	habits: ById<HabitWithPossiblySyntheticEntries>;
};

export default function HabitEntryItems({ habits }: HabitEntryItemsProps) {
	const { getHabit } = useHabitsData();
	const activeHabitId = useRecoilValue(activeHabitIdState);

	return (
		<>
			<L.ItemList
				style={{
					gridTemplateColumns: "max-content max-content auto"
				}}
			>
				{Object.values(habits).map((habit) => (
					<HabitEntryItem key={habit.habit_id} habit={habit} />
				))}
			</L.ItemList>

			{activeHabitId !== null && (
				<Modal modalId={modalIds.detailedActivity} initialOpen={false}>
					<DetailedHabit habit={getHabit({ habit_id: activeHabitId })} />
				</Modal>
			)}
		</>
	);
}

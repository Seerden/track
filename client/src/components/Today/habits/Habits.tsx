import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { MapById } from "@shared/types/data/utility.types";
import Empty from "@/components/Today/Empty";
import Habit from "@/components/Today/habits/Habit";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Containers from "@/lib/theme/components/container.style";
import Today from "../style/Today.style";
import S from "./style/Habits.style";

export default function Habits({
	habits,
}: {
	habits: MapById<HabitWithPossiblySyntheticEntries>;
}) {
	const habitsList = [...habits.values()];
	const { openModal } = useModalState();

	return (
		<S.Habits>
			<Today.BlockTitle>Habits</Today.BlockTitle>

			{habitsList.length > 0 ? (
				<Containers.Column gap="medium">
					{habitsList.map((habit) => (
						<Habit key={habit.habit_id} habit={habit} />
					))}
				</Containers.Column>
			) : (
				<Empty action={() => openModal(modalIds.habits.new)}>
					<span>No habits found for today. </span>
				</Empty>
			)}
		</S.Habits>
	);
}

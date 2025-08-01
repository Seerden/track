import Empty from "@/components/Today/Empty";
import Habit from "@/components/Today/Habit";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { flex } from "@/lib/theme/snippets/flex";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";
import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { ById } from "@shared/types/data/utility.types";
import S from "./style/Habits.style";
import T from "./style/Today.style";

type HabitsProps = {
	habitsById: ById<HabitWithPossiblySyntheticEntries>;
};

const HabitWrapper = styled.div`
	${flex.column};
	gap: ${spacingValue.medium};
`;

export default function Habits({ habitsById }: HabitsProps) {
	const habits = Object.values(habitsById);
	const { openModal } = useModalState();

	return (
		<S.Habits>
			<T.BlockTitle>Habits</T.BlockTitle>

			{habits.length > 0 ? (
				<HabitWrapper>
					{habits.map((habit) => (
						<Habit key={habit.habit_id} habit={habit} />
					))}
				</HabitWrapper>
			) : (
				<Empty action={() => openModal(modalIds.habits.new)}>
					<span>No habits found for today. </span>
				</Empty>
			)}
		</S.Habits>
	);
}

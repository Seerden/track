import type { Habit } from "@shared/lib/schemas/habit";
import { useAtomValue } from "jotai";
import type { PropsWithChildren } from "react";
import { createDate } from "@/lib/datetime/make-date";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import useHabitsData from "@/lib/hooks/useHabitsData";
import modalIds from "@/lib/modal-ids";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import C from "@/lib/theme/components/Card.style";
import HabitCalendar from "../calendar/HabitCalendar";
import S from "./style/DetailedHabit.style";

type DetailedHabitProps = {
	id: Habit["habit_id"];
};

export default function DetailedHabit({
	id,
}: PropsWithChildren<DetailedHabitProps>) {
	const { data: tags } = useQueryTags();
	// NOTE: we do not use getHabitsForTimeWindow, because for the habit
	// calendar, we want to create synthetic habits for potentially any date.
	const { getHabitById } = useHabitsData();
	const habit = getHabitById(id);

	const { openDetailedItemModal } = useDetailedItemModal(
		"tag",
		modalIds.tags.detailed
	);
	const timeWindow = useAtomValue(timeWindowAtom);

	if (!habit) return null;

	const humanizedStart = createDate(habit.start_timestamp).fromNow();
	const humanizedEnd = habit.end_timestamp
		? createDate(habit.end_timestamp).fromNow()
		: null;
	const humanizedFrequency = `${habit.frequency} time(s) per ${habit.interval} ${habit.interval_unit}(s)`; // TODO: consider using frequencyString from elsewhere

	return (
		<>
			<S.DetailedHabitCard>
				<C.Title>{habit.name}</C.Title>
				<p>{habit.description}</p>
				<S.InfoFields>
					{habit.goal_type === "goal" && (
						<C.InfoLine>
							<C.InfoLabel>Goal</C.InfoLabel>
							<C.InfoValue>
								{habit.goal} {habit.goal_unit}
							</C.InfoValue>
						</C.InfoLine>
					)}
					<C.InfoLine>
						<C.InfoLabel>How often?</C.InfoLabel>
						<C.InfoValue>{humanizedFrequency}</C.InfoValue>
					</C.InfoLine>
				</S.InfoFields>
				<C.Datetime
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<span>Tracking started {humanizedStart}</span>
					{habit.end_timestamp && <span>Tracking ends {humanizedEnd}</span>}
				</C.Datetime>

				{tags && (
					<C.Tags>
						{habit.tag_ids.map((id) => (
							<C.Tag
								key={id}
								onClick={(e) => {
									e.stopPropagation();
									openDetailedItemModal(id);
								}}
							>
								{/* TODO: See #176 */}
								{tags.get(id)?.name}
							</C.Tag>
						))}
					</C.Tags>
				)}
			</S.DetailedHabitCard>
			<HabitCalendar habit={habit} date={timeWindow.startDate} />
		</>
	);
}

import { createDate } from "@/lib/datetime/make-date";
import useTagsQuery from "@/lib/query/useTagsQuery";
import C from "@/lib/theme/components/Card.style";
import type { HabitWithIds } from "@/types/server/habit.types";
import type { PropsWithChildren } from "react";
import S from "./style/Habit.style";

type HabitProps = {
	habit: HabitWithIds;
};

export default function DetailedHabit({ habit }: PropsWithChildren<HabitProps>) {
	const { data: tagsData } = useTagsQuery();

	return (
		<S.HabitCard>
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
					<C.InfoValue>
						{habit.frequency} time(s) per {habit.interval} {habit.interval_unit}(s)
					</C.InfoValue>
				</C.InfoLine>
			</S.InfoFields>
			<C.Datetime
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start"
				}}
			>
				<span>Tracking started {createDate(habit.start_timestamp).fromNow()}</span>
				{habit.end_timestamp && (
					<span>Tracking ends {createDate(habit.end_timestamp).fromNow()}</span>
				)}
			</C.Datetime>
			{tagsData?.byId && (
				<C.Tags>
					{habit.tag_ids.map((id) => (
						<C.Tag key={id}>{tagsData.byId[id]?.name}</C.Tag>
					))}
				</C.Tags>
			)}
		</S.HabitCard>
	);
}

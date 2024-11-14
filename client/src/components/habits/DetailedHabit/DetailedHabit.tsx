import { createDate } from "@/lib/datetime/make-date";
import useTagsQuery from "@/lib/query/useTagsQuery";
import C from "@/lib/theme/components/Card.style";
import type { HabitWithIds } from "@/types/server/habit.types";
import type { PropsWithChildren } from "react";
import S from "./style/DetailedHabit.style";

type DetailedHabitProps = {
	habit: HabitWithIds;
};

export default function DetailedHabit({ habit }: PropsWithChildren<DetailedHabitProps>) {
	const { data: tagsData } = useTagsQuery();

	const humanizedStart = createDate(habit.start_timestamp).fromNow();
	const humanizedEnd = habit.end_timestamp
		? createDate(habit.end_timestamp).fromNow()
		: null;
	const humanizedFrequency = `${habit.frequency} time(s) per ${habit.interval} ${habit.interval_unit}(s)`;

	return (
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
					alignItems: "flex-start"
				}}
			>
				<span>Tracking started {humanizedStart}</span>
				{habit.end_timestamp && <span>Tracking ends {humanizedEnd}</span>}
			</C.Datetime>
			{tagsData?.byId && (
				<C.Tags>
					{habit.tag_ids.map((id) => (
						<C.Tag key={id}>{tagsData.byId[id]?.name}</C.Tag>
					))}
				</C.Tags>
			)}
		</S.DetailedHabitCard>
	);
}

import dayjs from "dayjs";
import { ActivityWithIds } from "../../types/server/activity.types";
import { activityDuration, activityStart, activityStartHour } from "./activity";
import * as S from "./Today.style";
import useToday from "./use-today";

/**
 * Format an index (presumably from 0-23) to HH:mm syntax.
 * TODO: is there a dayjs function for this?
 * TODO: move this to a helper file.
 */
function formatHour(
	index: number // index 0 is 12am, 1 is 1am, 12 is 12pm, 23 is 11pm, etc
) {
	return `${index < 10 ? "0" : ""}${index}:00`;
}

function HourMark({ index }: { index: number }) {
	const text = formatHour(index);
	return <S.HourMark>{text}</S.HourMark>;
}

function Row({
	index,
	activities,
	indentation
}: {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<number, number>;
}) {
	return (
		<S.Row>
			<HourMark index={index} />

			{activities.map((a) => {
				const level = indentation.get(a.activity_id) ?? 0;
				const heightOffset = activityStart(a).minute() / 60;
				return (
					<S.ActivityCard key={a.activity_id} $level={level} $offset={heightOffset}>
						<Activity activity={a} />
					</S.ActivityCard>
				);
			})}
		</S.Row>
	);
}

function Activity({ activity }: { activity: ActivityWithIds }) {
	return (
		<>
			<S.Activity $durationHours={activityDuration(activity)}>
				{activity.name}
			</S.Activity>
		</>
	);
}

export default function Today() {
	const { activities, indentation } = useToday();
	const today = dayjs();

	return (
		<S.Wrapper>
			<S.Title>Today</S.Title>
			<S.Rows>
				{Array.from(
					{ length: 24 }, // render a row for every hour of the day
					(_, i) => (
						<Row
							key={i}
							index={i}
							activities={activities.filter(
								(a) => activityStartHour(a, today) === i
							)}
							indentation={indentation}
						/>
					)
				)}
			</S.Rows>
		</S.Wrapper>
	);
}

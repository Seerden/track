import dayjs from "dayjs";
import { formatHour } from "../../lib/format-date";
import { ActivityWithIds } from "../../types/server/activity.types";
import { ID } from "../../types/server/utility.types";
import { activityDuration, activityStart, activityStartHour } from "./activity";
import * as S from "./Today.style";
import useToday from "./use-today";

function HourMark({ index }: { index: number }) {
	const label = formatHour(index);
	return <S.HourMark>{label}</S.HourMark>;
}

type RowProps = {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

function Row({ index, activities, indentation }: RowProps) {
	return (
		<S.Row>
			<HourMark index={index} />

			{activities.map((a) => (
				<Activity key={a.activity_id} activity={a} indentation={indentation} />
			))}
		</S.Row>
	);
}

type ActivityProps = {
	activity: ActivityWithIds;
	indentation: Map<ID, number>;
};

function Activity({ activity, indentation }: ActivityProps) {
	const durationHours = activityDuration(activity);
	const offset = activityStart(activity).minute() / 60;
	const level = indentation.get(activity.activity_id) ?? 0;

	return (
		<S.ActivityCard key={activity.activity_id} $level={level} $offset={offset}>
			<S.Activity $durationHours={durationHours}>{activity.name}</S.Activity>
		</S.ActivityCard>
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

import CurrentTimeMark from "@/components/Today/CurrentTimeMark";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { ID } from "@type/server/utility.types";
import Activity from "./Activity";
import HourMark from "./HourMark";
import R from "./style/TimelineRow.style";

type RowProps = {
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

export default function TimelineRow({ index, activities, indentation }: RowProps) {
	const currentTime = useCurrentTime();
	const isCurrentHour = currentTime.hour() === index;
	const offset = currentTime.minute() / 60;

	return (
		<R.Row>
			<HourMark index={index} highlighted={isCurrentHour} />

			{isCurrentHour && <CurrentTimeMark offset={offset} />}

			{activities.map((a) => (
				<Activity
					key={a.activity_id}
					activity={a}
					level={indentation.get(a.activity_id) ?? 0}
				/>
			))}
		</R.Row>
	);
}

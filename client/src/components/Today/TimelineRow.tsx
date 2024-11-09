import CurrentTimeMark from "@/components/Today/CurrentTimeMark";
import { isToday } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import type { Datelike } from "@/types/date.types";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { ID } from "@type/server/utility.types";
import Activity from "./Activity";
import HourMark from "./HourMark";
import R from "./style/TimelineRow.style";

type RowProps = {
	date: Datelike;
	/** `index` is a number [0,24] that represents the hour of the day. Index 24
	 * refers to midnight of the following day and is only there for display
	 * purposes. */
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

export default function TimelineRow({ date, index, activities, indentation }: RowProps) {
	const currentTime = useCurrentTime();
	const isCurrentHour = isToday(date) && currentTime.hour() === index;
	const offset = currentTime.minute() / 60;

	return (
		<R.Row>
			<HourMark index={index % 24} highlighted={isCurrentHour} />

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

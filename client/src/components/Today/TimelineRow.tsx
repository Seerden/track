import CurrentTimeMark from "@/components/Today/CurrentTimeMark";
import { createDate } from "@/lib/datetime/make-date";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import type { Datelike } from "@/types/date.types";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { ID } from "@type/server/utility.types";
import Activity from "./Activity";
import HourMark from "./HourMark";
import R from "./style/TimelineRow.style";

type RowProps = {
	date: Datelike;
	index: number;
	activities: ActivityWithIds[];
	indentation: Map<ID, number>;
};

export default function TimelineRow({ date, index, activities, indentation }: RowProps) {
	const currentTime = useCurrentTime();
	const isToday = createDate(new Date()).isSame(createDate(date), "day"); // TODO: there should be a helper for this
	const isCurrentHour = currentTime.hour() === index && isToday;
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

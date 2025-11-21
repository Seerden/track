import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { ID } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import CurrentTimeMark from "@/components/Today/timeline/CurrentTimeMark";
import { isToday } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import Activity from "../activities/Activity";
import HourMark from "./HourMark";
import S from "./style/TimelineRow.style";

type RowProps = {
	date: Dayjs;
	/** `index` is a number [0,24] that represents the hour of the day. Index 24
	 * refers to midnight of the following day and is only there for display
	 * purposes. */
	index: number;
	activities: PossiblySyntheticActivity[];
	indentation: Map<ID, number>;
};

export default function TimelineRow({
	date,
	index,
	activities,
	indentation,
}: RowProps) {
	const currentTime = useCurrentTime();
	const isCurrentHour = isToday(date) && currentTime.hour() === index;
	const offset = currentTime.minute() / 60;

	return (
		<S.Row
			$collapsed={activities.length === 0} // this shouldn't check if activities.length is 0, but if there are no activities that occur at this hour
		>
			<HourMark index={index % 24} highlighted={isCurrentHour} />

			{isCurrentHour && <CurrentTimeMark offset={offset} />}

			{activities.map((a) => (
				<Activity
					key={a.activity_id ?? a.synthetic_id}
					date={date}
					activity={a}
					level={indentation.get(a.activity_id ?? a.synthetic_id) ?? 0}
				/>
			))}
		</S.Row>
	);
}

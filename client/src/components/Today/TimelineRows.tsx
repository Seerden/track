import TimelineRow from "@/components/Today/TimelineRow";
import {
	activityStartHourOnDate,
	assignIndentationLevelToActivities
} from "@/lib/activity";
import type { ActivityWithIds } from "@shared/types/data/activity.types";
import type { Dayjs } from "dayjs";
import S from "./style/Today.style";

function useRows({
	activities,
	currentDate
}: {
	activities: ActivityWithIds[];
	/** `currentDate` will change to `date` once we make Today take a date as a
	 * prop. */
	currentDate: Dayjs;
}) {
	const indentation = assignIndentationLevelToActivities(activities, currentDate);

	return {
		indentation
	};
}

type RowsProps = {
	activities: ActivityWithIds[];
	currentDate: Dayjs;
};

export default function TimelineRows({ activities, currentDate }: RowsProps) {
	const { indentation } = useRows({ activities, currentDate });

	return (
		<S.Rows style={{ gridArea: "timeline" }}>
			{Array.from(
				{ length: 25 }, // render a row for every hour of the day
				(_, i) => (
					<TimelineRow
						date={currentDate}
						key={i}
						index={i}
						activities={activities.filter(
							(a) => activityStartHourOnDate(a, currentDate) === i
						)}
						indentation={indentation}
					/>
				)
			)}
		</S.Rows>
	);
}

import TimelineRow from "@/components/Today/TimelineRow";
import { activityStartHour, assignIndentationLevelToActivities } from "@/lib/activity";
import type { Datelike } from "@/types/date.types";
import type { ActivityWithIds } from "@/types/server/activity.types";
import S from "./style/Today.style";

function useRows({
	activities,
	currentDate
}: {
	activities: ActivityWithIds[];
	/** `currentDate` will change to `date` once we make Today take a date as a
	 * prop. */
	currentDate: Datelike;
}) {
	const indentation = assignIndentationLevelToActivities(activities, currentDate);

	return {
		indentation
	};
}

type RowsProps = {
	activities: ActivityWithIds[];
	currentDate: Datelike;
};

export default function TimelineRows({ activities, currentDate }: RowsProps) {
	const { indentation } = useRows({ activities, currentDate });

	return (
		<S.Rows>
			{Array.from(
				{ length: 25 }, // render a row for every hour of the day
				(_, i) => (
					<TimelineRow
						date={currentDate}
						key={i}
						index={i % 24}
						activities={activities.filter(
							(a) => activityStartHour(a, currentDate) === i
						)}
						indentation={indentation}
					/>
				)
			)}
		</S.Rows>
	);
}

import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";
import { AnimatePresence } from "motion/react";
import TimelineRow from "@/components/Today/timeline/TimelineRow";
import { activityStartHourOnDate } from "@/lib/activity";
import Containers from "@/lib/theme/components/container.style";
import { assignIndentationLevelToActivities } from "@/lib/timeline";

type RowsProps = {
	activities: PossiblySyntheticActivity[];
	/** @todo `currentDate` will change to `date` once we make Today take a date
	 * as a prop. */
	currentDate: Dayjs;
};

function useRows({ activities, currentDate }: RowsProps) {
	return {
		indentation: assignIndentationLevelToActivities(activities, currentDate),
	};
}

export default function TimelineRows({ activities, currentDate }: RowsProps) {
	const { indentation } = useRows({ activities, currentDate });

	return (
		<Containers.Column
			/** @ts-ignore  */
			as="ul"
			style={{ gridArea: "timeline" }}
		>
			<AnimatePresence mode="popLayout">
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
			</AnimatePresence>
		</Containers.Column>
	);
}

import { useDetailedActivityModal } from "@/components/Today/hooks/useDetailedActivityModal";
import { activityDurationOnDate, activityStartOnDate } from "@/lib/activity";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { Datelike } from "@t/data/utility.types";
import T from "./style/Activity.style";

function useActivity(activity: ActivityWithIds, date: Datelike) {
	const start = activityStartOnDate(activity, date);
	const offset = !start ? 0 : start.minute() / 60;
	const { openDetailedActivityModal } = useDetailedActivityModal(activity);

	/** This is the _displayed_ duration on the Today timeline. A multiday
	 * activity still "ends" at midnight on this view. */
	const durationHoursOnDate = activityDurationOnDate(activity, date);

	return {
		durationHoursOnDate,
		offset,
		openDetailedActivityModal
	} as const;
}

export type ActivityProps = {
	activity: ActivityWithIds;
	level: number;
	date: Datelike;
};

export default function Activity({ activity, level, date }: ActivityProps) {
	const { offset, openDetailedActivityModal, durationHoursOnDate } = useActivity(
		activity,
		date
	);

	return (
		<T.ActivityCard
			key={activity.activity_id}
			$level={level}
			$offset={offset}
			onClick={(e) => {
				e.stopPropagation();
				openDetailedActivityModal();
			}}
		>
			{/* TODO: on mouseover, display a short humanized time string */}
			<T.Activity
				$isTask={activity.is_task}
				$durationHours={durationHoursOnDate}
				$completed={activity.completed}
			>
				<T.ActivityName>{activity.name}</T.ActivityName>
			</T.Activity>
		</T.ActivityCard>
	);
}

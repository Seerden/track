import { activityDurationOnDate, activityStartOnDate } from "@/lib/activity";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import modalIds from "@/lib/modal-ids";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";
import T from "./style/Activity.style";

function useActivity(activity: PossiblySyntheticActivity, date: Dayjs) {
	const start = activityStartOnDate(activity, date);
	const offset = !start ? 0 : start.minute() / 60;
	const { openDetailedItemModal } = useDetailedItemModal(
		"activity",
		modalIds.detailedActivity
	);

	/** This is the _displayed_ duration on the Today timeline. A multiday
	 * activity still "ends" at midnight on this view. */
	const durationHoursOnDate = activityDurationOnDate(activity, date);

	return {
		durationHoursOnDate,
		offset,
		openDetailedItemModal
	} as const;
}

export type ActivityProps = {
	activity: PossiblySyntheticActivity;
	level: number;
	date: Dayjs;
};

export default function Activity({ activity, level, date }: ActivityProps) {
	const { offset, openDetailedItemModal, durationHoursOnDate } = useActivity(
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
				openDetailedItemModal(activity.activity_id ?? activity.synthetic_id);
			}}
		>
			{/* TODO: on mouseover, display a short humanized time string */}
			<T.Activity
				$isTask={activity.is_task}
				$durationHours={durationHoursOnDate}
				$completed={activity.completed ?? false}
			>
				<T.ActivityName>{activity.name}</T.ActivityName>
			</T.Activity>
		</T.ActivityCard>
	);
}

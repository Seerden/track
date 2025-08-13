import { activityDurationOnDate, activityStartOnDate } from "@/lib/activity";
import { useQueryRecurrenceById } from "@/lib/hooks/query/activities/useQueryRecurrenceById";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import modalIds from "@/lib/modal-ids";
import { colors } from "@/lib/theme/colors";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";
import { LucideRepeat } from "lucide-react";
import T from "./style/Activity.style";

// TODO: move this to its own file, like other component hooks.
function useActivity(activity: PossiblySyntheticActivity, date: Dayjs) {
	const { data: recurrence } = useQueryRecurrenceById(activity.recurrence_id);
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
		openDetailedItemModal,
		recurrence
	} as const;
}

export type ActivityProps = {
	activity: PossiblySyntheticActivity;
	level: number;
	date: Dayjs;
};

export default function Activity({ activity, level, date }: ActivityProps) {
	const { offset, openDetailedItemModal, durationHoursOnDate, recurrence } = useActivity(
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
				$isRecurring={!!activity.recurrence_id || !!activity.will_recur}
				$durationHours={durationHoursOnDate}
				$completed={activity.completed ?? false}
			>
				<T.ActivityName>{activity.name}</T.ActivityName>

				{!!recurrence && (
					<div
						style={{
							position: "absolute",
							right: `calc(${spacingValue.smaller})`,
							// 7px is half the height of the icon; make it a variable
							// 3px is the padding
							top: `calc(50% - 7px - 0.5 * 3px)`
						}}
					>
						{/* TOOD: this is a badge, put it in style/badges or something */}
						<span
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "white",
								padding: "3px",
								borderRadius: "50%"
							}}
						>
							{/* TODO: use the color of the activity itself, think 
                              we can target .lucide in T.Activity to make that 
                              happen */}
							<LucideRepeat size={12} color={colors.blue.main} />
						</span>
					</div>
				)}
			</T.Activity>
		</T.ActivityCard>
	);
}

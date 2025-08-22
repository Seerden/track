import { activityDurationOnDate, activityStartOnDate } from "@/lib/activity";
import { useQueryRecurrenceById } from "@/lib/hooks/query/activities/useQueryRecurrenceById";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import modalIds from "@/lib/modal-ids";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { Dayjs } from "dayjs";

export function useActivity(activity: PossiblySyntheticActivity, date: Dayjs) {
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
		recurrence,
	} as const;
}

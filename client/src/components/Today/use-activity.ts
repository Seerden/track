import type { ActivityProps } from "@/components/Today/Activity";
import { useDetailedActivityModal } from "@/components/Today/use-detailed-activity-modal";
import { activityDuration, activityStart, activityStartHour } from "@/lib/activity";

type UseActivityProps = ActivityProps;

export default function useActivity({ activity, indentation }: UseActivityProps) {
	const offset = activityStart(activity).minute() / 60;

	/** This is the _displayed_ duration on the Today timeline. A multiday
	 * activity still "ends" at midnight on this view. TODO: maybe change this
	 * variable name to reflect this. */
	const durationHours = Math.min(
		activityDuration(activity),
		24 - offset - activityStartHour(activity, activityStart(activity)),
	);

	const level = indentation.get(activity.activity_id) ?? 0;
	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });

	function openActivityModal(e: React.MouseEvent) {
		openDetailedActivityModal();
		e.stopPropagation();
	}

	return {
		durationHours,
		offset,
		level,
		openActivityModal,
	};
}

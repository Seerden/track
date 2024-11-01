import { useDetailedActivityModal } from "@/components/Today/hooks/use-detailed-activity-modal";
import { activityDuration, activityStart, activityStartHour } from "@/lib/activity";
import usePutTaskCompletion from "@/lib/hooks/use-put-task-completion";
import type { ActivityWithIds } from "@/types/server/activity.types";

export default function useActivity({ activity }: { activity: ActivityWithIds }) {
	const offset = activityStart(activity).minute() / 60;

	/** This is the _displayed_ duration on the Today timeline. A multiday
	 * activity still "ends" at midnight on this view. TODO: maybe change this
	 * variable name to reflect this. */
	const durationHours = Math.min(
		activityDuration(activity),
		24 - offset - activityStartHour(activity, activityStart(activity)),
	);

	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });

	function openActivityModal(e: React.MouseEvent) {
		openDetailedActivityModal();
		e.stopPropagation();
	}

	const putCompletion = usePutTaskCompletion(activity);

	return {
		durationHours,
		offset,
		openActivityModal,
		putCompletion,
	};
}

import type { ActivityProps } from "@/components/Today/Activity";
import { activityDuration, activityStart, activityStartHour } from "@/lib/activity";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";

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
	const { setModalState } = useModalState(modalIds.detailedActivity);

	function openActivityModal(e: React.MouseEvent) {
		setModalState(() => ({
			isOpen: true,
			itemId: activity.activity_id,
			itemType: "activity",
		}));
		e.stopPropagation();
	}

	return {
		durationHours,
		offset,
		level,
		openActivityModal,
	};
}

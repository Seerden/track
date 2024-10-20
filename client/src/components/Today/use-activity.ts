import type { ActivityProps } from "@/components/Today/Activity";
import { activityDuration, activityStart } from "@/lib/activity";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";

type UseActivityProps = ActivityProps;

export default function useActivity({ activity, indentation }: UseActivityProps) {
	const durationHours = activityDuration(activity);
	const offset = activityStart(activity).minute() / 60;
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

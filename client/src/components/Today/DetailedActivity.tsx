import Modal from "@/components/Modal";
import useActivitiesQuery from "@/lib/query/use-activities-query";
import type { ActivityWithIds } from "@/types/server/activity.types";

type DetailedActivityProps = {
	id: ActivityWithIds["activity_id"];
};

export const activityModalId = "activity-modal";

export default function DetailedActivity({ id }: DetailedActivityProps) {
	const { data: activitiesData } = useActivitiesQuery();
	if (!activitiesData) return null;

	const activity = activitiesData.activitiesById[id];

	return (
		<Modal modalId={activityModalId}>
			<div>{activity.name}</div>
		</Modal>
	);
}

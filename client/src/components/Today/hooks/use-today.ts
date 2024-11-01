import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import {
	activityFallsOnDay,
	assignIndentationLevelToActivities,
	isAllDayActivityOnDate,
} from "@lib/activity";
import { today } from "@lib/datetime/make-date";
import useActivitiesQuery from "@lib/query/use-activities-query";
import { useMemo } from "react";

export default function useToday() {
	const { data: activitiesData } = useActivitiesQuery();
	const activities = useMemo(() => {
		return Object.values(activitiesData?.activitiesById ?? {}); // TODO: should this not be in a useActivities hook or someting?
	}, [activitiesData]);

	const currentDate = today();

	const todayActivities = activities.filter((activity) => {
		return activityFallsOnDay(activity, currentDate);
	});

	const allDayActivities = activities.filter((activity) =>
		isAllDayActivityOnDate(activity, currentDate),
	);

	const timestampedActivities = activities.filter(
		(activity) => !isAllDayActivityOnDate(activity, currentDate),
	);
	const indentation = assignIndentationLevelToActivities(
		timestampedActivities,
		currentDate,
	);

	const { state } = useModalState(modalIds.detailedActivity);
	const shouldShowDetailedActivity = !!(
		state.isOpen &&
		state.itemType === "activity" &&
		state.itemId
	);

	const selectedActivity = activities.find((a) => a.activity_id === state.itemId);

	return {
		activities: todayActivities,
		allDayActivities,
		timestampedActivities,
		indentation,
		currentDate,
		shouldShowDetailedActivity,
		selectedActivity,
	};
}

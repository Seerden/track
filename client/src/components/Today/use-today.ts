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
		return (
			activityFallsOnDay(activity, currentDate) &&
			!isAllDayActivityOnDate(activity, currentDate)
		);
	});
	const allDayActivities = activities.filter((activity) =>
		isAllDayActivityOnDate(activity, currentDate),
	);
	const indentation = assignIndentationLevelToActivities(todayActivities, currentDate);

	const { state } = useModalState(modalIds.detailedActivity);
	const shouldShowDetailedActivity = !!(
		state.isOpen &&
		state.itemType === "activity" &&
		state.itemId
	);

	return {
		activities: todayActivities,
		allDayActivities,
		indentation,
		currentDate,
		shouldShowDetailedActivity,
		modalState: state,
	};
}

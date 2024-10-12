import { activityFallsOnDay, assignIndentationLevelToActivities } from "@lib/activity";
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
	const indentation = assignIndentationLevelToActivities(todayActivities, currentDate);

	return { activities: todayActivities, indentation, currentDate };
}

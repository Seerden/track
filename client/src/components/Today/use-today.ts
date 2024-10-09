import dayjs from "dayjs";
import { useMemo } from "react";
import useActivitiesQuery from "../../lib/use-activities-query";
import { activityFallsOnDay, assignIndentationLevelToActivities } from "./activity";

export default function useToday() {
	const { data: activitiesData } = useActivitiesQuery();
	const activities = useMemo(() => {
		return Object.values(activitiesData?.activitiesById ?? {}); // TODO: should this not be in a useActivities hook or someting?
	}, [activitiesData]);

	Object.values(activitiesData?.activitiesById ?? {});
	const today = dayjs.utc();
	const todayActivities = activities.filter((activity) => {
		return activityFallsOnDay(activity, today);
	});
	const indentation = assignIndentationLevelToActivities(todayActivities, today);

	return { activities: todayActivities, indentation };
}

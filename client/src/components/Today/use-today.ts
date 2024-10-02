import dayjs from "dayjs";
import useActivitiesQuery from "../../lib/use-activities-query";
import { activityFallsOnDay, assignIndentationLevelToActivities } from "./activity";

export default function useToday() {
	const { data: activitiesData } = useActivitiesQuery();
	const activities = Object.values(activitiesData?.activitiesById ?? {});
	const today = dayjs();
	const todayActivities = activities.filter((activity) => {
		return activityFallsOnDay(activity, today);
	});
	const indentation = assignIndentationLevelToActivities(todayActivities, today);

	return { activities: todayActivities, indentation };
}

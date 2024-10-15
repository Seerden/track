import { ActivityWithDates, ActivityWithTimestamps } from "@/types/server/activity.types";

function isActivityWithTimestamps(
	activity: Partial<ActivityWithTimestamps | ActivityWithDates>,
): activity is ActivityWithTimestamps {
	return (
		activity.started_at !== null &&
		activity.ended_at !== null &&
		activity.start_date === null &&
		activity.end_date === null
	);
}

function isActivityWithDates(
	activity: Partial<ActivityWithTimestamps | ActivityWithDates>,
): activity is ActivityWithDates {
	return (
		activity.started_at === null &&
		activity.ended_at === null &&
		activity.start_date !== null &&
		activity.end_date !== null
	);
}

export const activityGuards = {
	withTimestamps: isActivityWithTimestamps,
	withDates: isActivityWithDates,
};

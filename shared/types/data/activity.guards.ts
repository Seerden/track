import type { ActivityWithDates, ActivityWithTimestamps } from "types/data/activity.types";
import { missing } from "types/data/utility.guards";

function isActivityWithTimestamps(
	activity: Partial<ActivityWithTimestamps | ActivityWithDates>
): activity is ActivityWithTimestamps {
	return (
		activity.started_at !== null &&
		activity.ended_at !== null &&
		missing(activity.start_date) &&
		missing(activity.end_date)
	);
}

function isActivityWithDates(
	activity: Partial<ActivityWithTimestamps | ActivityWithDates>
): activity is ActivityWithDates {
	return (
		missing(activity.started_at) &&
		missing(activity.ended_at) &&
		activity.start_date !== null &&
		activity.end_date !== null
	);
}

export const activityGuards = {
	withTimestamps: isActivityWithTimestamps,
	withDates: isActivityWithDates,
};

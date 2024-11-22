import type { Activity, ActivityWithIds } from "@t/data/activity.types";
import type { ActivityTagRelation } from "@t/data/relational.types";
import type { ById } from "@t/data/utility.types";

export function mergeActivitiesAndRelations(
	activities: Activity[],
	activityTagRelations: ActivityTagRelation[],
) {
	const activitiesById = {} as ById<ActivityWithIds>;
	for (const activity of activities) {
		activitiesById[activity.activity_id] = Object.assign(activity, { tag_ids: [] });
	}

	for (const { activity_id, tag_id } of activityTagRelations) {
		activitiesById[activity_id]?.tag_ids?.push(tag_id);
	}

	return activitiesById;
}

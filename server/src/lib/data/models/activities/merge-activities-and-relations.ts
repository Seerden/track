import { mapById } from "@shared/lib/map";
import type { Activity, ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { MapById } from "@shared/types/data/utility.types";

export function mergeActivitiesAndRelations(
	activities: Activity[],
	activityTagRelations: ActivityTagRelation[],
) {
	const activityMap = mapById(activities, "activity_id");
	const withTagIds: MapById<ActivityWithIds> = new Map();
	for (const activity of activities) {
		const withoutTagIds = activityMap.get(activity.activity_id);
		if (withoutTagIds) {
			withTagIds.set(activity.activity_id, { ...withoutTagIds, tag_ids: [] });
		}
	}

	for (const { activity_id, tag_id } of activityTagRelations) {
		withTagIds.get(activity_id)?.tag_ids?.push(tag_id);
	}

	return withTagIds;
}

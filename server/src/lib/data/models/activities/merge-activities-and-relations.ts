import { isNullish } from "@shared/lib/is-nullish";
import { mapById } from "@shared/lib/map";
import type { Activity, ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ActivityTagRelation } from "@shared/types/data/relational.types";
import type { ID, MapById } from "@shared/types/data/utility.types";
import { queryTagsForRecurringActivities } from "../tags/query-tags";

export async function mergeActivitiesAndRelations(
	activities: Activity[],
	activityTagRelations: ActivityTagRelation[],
	user_id: ID
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

	const uniqueRecurrenceIds = Array.from(
		new Set(
			activities
				.filter((a) => !a.will_recur && !!a.recurrence_id)
				.map((a) => a.recurrence_id) as string[]
		)
	);

	const recurringTagIdMap = await queryTagsForRecurringActivities({
		user_id,
		recurrence_ids: uniqueRecurrenceIds,
	});

	// TODO: BROKEN! This does not always work as intended, because `activities`
	// is not always a complete list of all of a user's activities. Aside from
	// that, the logic works.
	for (const activity of activities) {
		// loop over all recurring entries except the originating ones and set
		// their tag_ids to the tag_ids of the originating activity.
		if (!isNullish(activity.recurrence_id) && !activity.will_recur) {
			const tag_ids = recurringTagIdMap.get(activity.recurrence_id) ?? [];

			withTagIds.get(activity.activity_id)?.tag_ids?.push(...tag_ids);
		}
	}

	return withTagIds;
}

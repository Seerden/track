import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ID, Nullable } from "@shared/types/data/utility.types";
import type { TagFilter } from "@/components/activities/ActivityFilter/TagsTab";

export const tagPredicates = {
	includes: (
		activity: ActivityWithIds,
		tag_ids: Nullable<ID[]>,
		exact?: boolean
	) => {
		if (!tag_ids?.length) return true;

		return exact
			? tag_ids.every((tag_id) => activity.tag_ids.includes(tag_id))
			: tag_ids.some((tag_id) => activity.tag_ids.includes(tag_id));
	},

	excludes: (
		activity: ActivityWithIds,
		tag_ids: Nullable<ID[]>,
		exact?: boolean
	) => {
		if (!tag_ids?.length) return true;

		return exact
			? !tag_ids.every((tag_id) => activity.tag_ids.includes(tag_id))
			: !tag_ids.some((tag_id) => !activity.tag_ids.includes(tag_id));
	},
};

export function filterByTags(activities: ActivityWithIds[], filter: TagFilter) {
	const predicate = tagPredicates[filter.type];
	return activities.filter((activity) =>
		predicate(activity, filter.value, filter.exact)
	);
}

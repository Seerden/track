import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { ID, Nullable } from "@t/data/utility.types";

// TODO: this doesn't handle the "exact" case yet. Since tags are stateful, I
// think this should be handled outside the filter function itself. Maybe,
// instead of passing activities.tag_ids as ID[], we pass it as Array<{tag_id: ID,
// tag_tree_id: ID}}>, and then we can do the filtering in the filter/predicate
// function.

export const tagPredicates = {
	includes: (activity: ActivityWithIds, tag_ids: Nullable<ID[]>) =>
		tag_ids?.length
			? tag_ids.every((tag_id) => activity.tag_ids.includes(tag_id))
			: true,
	excludes: (activity: ActivityWithIds, tag_ids: Nullable<ID[]>) =>
		tag_ids?.length
			? tag_ids.every((tag_id) => !activity.tag_ids.includes(tag_id))
			: true
};

export function filterByTags(
	activities: ActivityWithIds[],
	filter: ActivityFilterWithValues["tags"]
) {
	const predicate = tagPredicates[filter.type];
	return activities.filter((activity) => predicate(activity, filter.value));
}

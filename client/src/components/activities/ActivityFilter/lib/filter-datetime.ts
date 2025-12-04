import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { ActivityFilterState } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { activityEnd, activityStart } from "@/lib/activity";

export const datetimePredicates = {
	starts: datetimeStartsPredicate,
	ends: datetimeEndsPredicate,
	/** @todo: this is not yet implemented */
	occurs: (_: ActivityWithIds, __: ActivityFilterState["datetime"]) => true,
};

function datetimeStartsPredicate(
	activity: ActivityWithIds,
	filter: ActivityFilterState["datetime"]
) {
	if (!filter.value?.length) return true;

	const [first, second] = filter.value;

	switch (filter.selector) {
		case "before":
			return activityStart(activity).isBefore(first);
		case "between":
			return !first || !second
				? true
				: !activityStart(activity).isBefore(first) &&
						!activityStart(activity).isAfter(second);
		case "after":
			return activityStart(activity).isAfter(first);
	}
}

function datetimeEndsPredicate(
	activity: ActivityWithIds,
	filter: ActivityFilterState["datetime"]
) {
	if (!filter.value?.length) return true;

	const [first, second] = filter.value;

	switch (filter.selector) {
		case "before":
			return activityEnd(activity).isBefore(first);
		case "between":
			if (!first || !second) return true;
			return (
				!activityEnd(activity).isBefore(first) &&
				!activityEnd(activity).isAfter(second)
			);
		case "after":
			return activityEnd(activity).isAfter(first);
	}
}

export function filterByDatetime(
	activities: ActivityWithIds[],
	filter: ActivityFilterState["datetime"]
) {
	const predicate = datetimePredicates[filter.modifier];
	return activities.filter((activity) => predicate(activity, filter));
}

import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { filterByDatetime } from "@/components/activities/ActivityFilter/lib/filter-datetime";
import { filterByName } from "@/components/activities/ActivityFilter/lib/filter-name";
import { filterByTags } from "@/components/activities/ActivityFilter/lib/filter-tags";
import type { ActivityWithIds } from "@shared/types/data/activity.types";

export function filterActivities({
	activities,
	filter
}: {
	activities: ActivityWithIds[];
	filter: ActivityFilterWithValues;
}): ActivityWithIds[] {
	const filteredByName = filterByName(activities, filter.name);

	// TODO: consider also returning the list of applied filters, so that we can
	// implement custom messages for when the list is empty.

	if (!filteredByName.length) {
		return [];
	}

	const filteredByTags = filterByTags(filteredByName, filter.tags);

	if (!filteredByTags.length) {
		return [];
	}

	const filteredByDatetime = filterByDatetime(filteredByTags, filter.datetime);

	// TODO: also always return the list of applied filters

	return filteredByDatetime;
}

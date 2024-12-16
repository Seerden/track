import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { filterByDatetime } from "@/components/activities/ActivityFilter/filter-datetime-predicates";
import { filterByTags } from "@/components/activities/ActivityFilter/filter-tags-predicates";
import type { ActivityWithIds } from "@t/data/activity.types";

const namePredicates = {
	includes: (name: string, value: string) => name.includes(value),
	equals: (name: string, value: string) => name === value,
	excludes: (name: string, value: string) => !name.includes(value),
	startsWith: (name: string, value: string) => name.startsWith(value),
	endsWith: (name: string, value: string) => name.endsWith(value)
};

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

function filterByName(
	activities: ActivityWithIds[],
	filter: ActivityFilterWithValues["name"]
): ActivityWithIds[] {
	const value = filter.value;

	if (!value) {
		return activities;
	}

	const namePredicate = namePredicates[filter.type];
	return activities.filter((activity) =>
		namePredicate(activity.name.toLowerCase(), value.toLowerCase())
	);
}

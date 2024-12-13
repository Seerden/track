import { filterByDatetime } from "@/components/activities/ActivityOverview/filter-datetime-predicates";
import { filterByTags } from "@/components/activities/ActivityOverview/filter-tags-predicates";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { ID, Nullable } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";

type ActivityFilter = {
	name: {
		type: "includes" | "equals" | "excludes" | "startsWith" | "endsWith";
	};
	datetime: {
		modifier: "starts" | "ends" | "occurs";
		selector: "before" | "between" | "after";
	};
	tags: {
		type: "includes" | "excludes";
		/** if `!exact`, it considers all ids from the tree that `id` is part of. */
		exact?: boolean; // TODO: this is not yet implemented (see filter-tags-predicates.ts)
	};
};

type FilterValueMap = {
	name: string;
	datetime: Dayjs[];
	tags: ID[];
};

export type ActivityFilterWithState = {
	[K in keyof ActivityFilter]: ActivityFilter[K] & {
		value: Nullable<FilterValueMap[K]>;
	};
};

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
	filter: ActivityFilterWithState;
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
	filter: ActivityFilterWithState["name"]
): ActivityWithIds[] {
	const value = filter.value;

	if (!value) {
		return activities;
	}

	const namePredicate = namePredicates[filter.type];
	return activities.filter((activity) => namePredicate(activity.name, value));
}

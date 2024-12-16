import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import type { ActivityWithIds } from "@t/data/activity.types";

export const namePredicates = {
	includes: (name: string, value: string) => name.includes(value),
	equals: (name: string, value: string) => name === value,
	excludes: (name: string, value: string) => !name.includes(value),
	startsWith: (name: string, value: string) => name.startsWith(value),
	endsWith: (name: string, value: string) => name.endsWith(value)
};

export function filterByName(
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

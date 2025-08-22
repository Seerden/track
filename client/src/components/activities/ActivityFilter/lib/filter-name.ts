import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";

type ActivityFilterNameType = ActivityFilterWithValues["name"]["type"];

export const namePredicates: Record<
	ActivityFilterNameType,
	(name: string, value: string) => boolean
> = {
	includes: (name, value) => name.includes(value),
	equals: (name, value) => name === value,
	excludes: (name, value) => !name.includes(value),
	startsWith: (name, value) => name.startsWith(value),
	endsWith: (name, value) => name.endsWith(value),
};

export const nameTypeOptions = Object.keys(
	namePredicates
) as ActivityFilterNameType[];

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

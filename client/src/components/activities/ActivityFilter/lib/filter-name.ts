import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type {
	NameFilter,
	NameType,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";

export const namePredicates: Record<
	NameType,
	(name: string, value: string) => boolean
> = {
	includes: (name, value) => name.includes(value),
	equals: (name, value) => name === value,
	excludes: (name, value) => !name.includes(value),
	startsWith: (name, value) => name.startsWith(value),
	endsWith: (name, value) => name.endsWith(value),
};

export const nameTypeOptions = Object.keys(namePredicates) as NameType[];

export function filterByName(
	activities: ActivityWithIds[],
	filter: NameFilter
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

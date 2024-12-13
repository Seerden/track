import { activityStart } from "@/lib/activity";
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
		exact?: boolean;
	};
};

type FilterValueMap = {
	name: string;
	datetime: Dayjs[];
	tags: ID[];
};

type ActivityFilterWithState = {
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

const datetimePredicates = {
	starts: (activity: ActivityWithIds, filter: ActivityFilterWithState["datetime"]) => {
		switch (filter.selector) {
			case "before":
				return !filter.value
					? true
					: activityStart(activity).isBefore(filter.value[0]);
			case "between":
				return !filter.value?.[0] || !filter.value[1]
					? true
					: activityStart(activity).isSame(filter.value[0]) ||
							activityStart(activity).isAfter(filter.value[0]) ||
							activityStart(activity).isSame(filter.value[1]) ||
							activityStart(activity).isBefore(filter.value[1]);
			case "after":
				return;
		}
	}
};

function filterActivities({
	activities,
	filter
}: {
	activities: ActivityWithIds[];
	filter: ActivityFilter;
}): ActivityWithIds[] {
	return activities;
}

function filterByName(
	activities: ActivityWithIds[],
	filter: ActivityFilterWithState["name"]
): ActivityWithIds[] {
	const value = filter.value;

	if (!value) {
		return activities;
	}

	const predicate = namePredicates[filter.type];
	return activities.filter((activity) => predicate(activity.name, value));
}

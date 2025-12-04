import type {
	ActivityFilterState,
	Tabs,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";

export const defaultActivityFilter = {
	datetime: {
		modifier: "starts",
		selector: "after",
		value: null,
	},
	name: {
		type: "includes",
		value: null,
	},
} satisfies ActivityFilterState;

export const activityFilterTabs = [
	"name",
	"datetime",
	"tags",
] as const satisfies Tabs[];

export const datetimeFilterModifiers = [
	"starts",
	"ends",
	"occurs",
] as const satisfies ActivityFilterState["datetime"]["modifier"][];

export const datetimeFilterSelectors = [
	"before",
	"between",
	"after",
] as const satisfies ActivityFilterState["datetime"]["selector"][];

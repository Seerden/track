import type {
	ActivityFilterDatetimeModifier,
	ActivityFilterDatetimeSelector,
	ActivityFilterTabs,
	ActivityFilterWithValues,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";

export const defaultFilter = {
	datetime: {
		modifier: "starts",
		selector: "after",
		value: null,
	},
	name: {
		type: "includes",
		value: null,
	},
} satisfies ActivityFilterWithValues;

// TODO: the type for ActivityFilterTabs is so convoluted. I tweaked it so I
// could add "tags" here without typescript erroring.
export const activityFilterTabs: ActivityFilterTabs[] = [
	"name",
	"datetime",
	"tags",
];
export const activityFilterDatetimeModifiers: ActivityFilterDatetimeModifier[] =
	["starts", "ends", "occurs"];
export const activityFilterDatetimeSelectors: ActivityFilterDatetimeSelector[] =
	["before", "between", "after"];

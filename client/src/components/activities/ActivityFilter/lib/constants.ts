import type {
	ActivityFilterDatetimeModifier,
	ActivityFilterDatetimeSelector,
	ActivityFilterTabs,
	ActivityFilterTagsType,
	ActivityFilterWithValues
} from "@/components/activities/ActivityFilter/ActivityFilter.types";

export const defaultFilter: ActivityFilterWithValues = {
	datetime: {
		modifier: "starts",
		selector: "after",
		value: null
	},
	name: {
		type: "includes",
		value: null
	},
	tags: {
		type: "includes",
		exact: true,
		value: null,
		search: ""
	}
};

export const activityFilterTabs: ActivityFilterTabs[] = ["name", "datetime", "tags"];
export const activityFilterTagsTypes: ActivityFilterTagsType[] = ["includes", "excludes"];
export const activityFilterDatetimeModifiers: ActivityFilterDatetimeModifier[] = [
	"starts",
	"ends",
	"occurs"
];
export const activityFilterDatetimeSelectors: ActivityFilterDatetimeSelector[] = [
	"before",
	"between",
	"after"
];

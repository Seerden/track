import type {
	ActivityFilterTabs,
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

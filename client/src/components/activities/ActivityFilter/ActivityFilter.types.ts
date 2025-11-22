import type { Nullable } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";

export type Tabs = "name" | "datetime" | "tags";
export type DatetimeModifier = "starts" | "ends" | "occurs";
export type DatetimeSelector = "before" | "between" | "after";
export type NameType =
	| "includes"
	| "equals"
	| "excludes"
	| "startsWith"
	| "endsWith";

export type ActivityFilterState = {
	name: {
		type: NameType;
		value: Nullable<string>;
	};
	datetime: {
		// TODO: "occurs" is not implemented yet -- it doesn't have any influence on the filtering
		modifier: DatetimeModifier;
		selector: DatetimeSelector;
		value: Nullable<Dayjs[]>;
	};
};
export type NameFilter = ActivityFilterState["name"];
export type DatetimeFilter = ActivityFilterState["datetime"];

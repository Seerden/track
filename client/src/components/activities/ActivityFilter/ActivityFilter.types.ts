import type { ID, Nullable } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";

export type ActivityFilterState = {
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
		exact?: boolean; // TODO: this is not properly implemented yet
	};
};

export type ActivityFilterValueMap = {
	name: string;
	datetime: Dayjs[];
	tags: ID[];
};

export type ActivityFilterWithValues = {
	[K in keyof ActivityFilterState]: ActivityFilterState[K] & {
		value: Nullable<ActivityFilterValueMap[K]>;
	};
};

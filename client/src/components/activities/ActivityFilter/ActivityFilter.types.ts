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

export type FilterResetAction = {
	type: "filter-name" | "name-filter" | "datetime-filter" | "tags-filter";
};

export type FilterUpdateAction =
	| {
			type: "filter-name-type";
			e: React.ChangeEvent<HTMLSelectElement>;
	  }
	| {
			type: "filter-name-value";
			e: React.ChangeEvent<HTMLInputElement>;
	  }
	| {
			type: "datetime-filter-modifier";
			value: string;
	  }
	| {
			type: "datetime-filter-selector";
			selector: string;
	  }
	| {
			type: "datetime-filter-value";
			value: Date | null;
			index: number;
	  }
	| {
			type: "active-tag-ids";
			tag_id: ID;
			action: "on" | "off";
	  }
	| {
			type: "filter-tags-type";
			e: React.ChangeEvent<HTMLSelectElement>;
	  };

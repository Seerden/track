import type { ID, Nullable } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";

export type ActivityFilterState = {
	name: {
		type: "includes" | "equals" | "excludes" | "startsWith" | "endsWith";
	};
	datetime: {
		// TODO: "occurs" is not implemented yet -- it doesn't have any influence on the filtering
		modifier: "starts" | "ends" | "occurs";
		selector: "before" | "between" | "after";
	};
	tags: {
		type: "includes" | "excludes";
		/** if `!exact`, it considers all ids from the tree that `id` is part of. */
		exact?: boolean;
		search: string;
	};
};

export type ActivityFilterTabs = keyof ActivityFilterState;
export type ActivityFilterTagsType = ActivityFilterState["tags"]["type"];
export type ActivityFilterDatetimeModifier =
	ActivityFilterState["datetime"]["modifier"];
export type ActivityFilterDatetimeSelector =
	ActivityFilterState["datetime"]["selector"];

type ActivityFilterValueMap = {
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
	type:
		| "name-value"
		| "name-filter"
		| "datetime"
		| "tags-value"
		| "tags-search";
};

export type FilterUpdateAction =
	| {
			type: "name-type";
			e: React.ChangeEvent<HTMLSelectElement>;
	  }
	| {
			type: "name-value";
			e: React.ChangeEvent<HTMLInputElement>;
	  }
	| {
			type: "datetime-modifier";
			value: string;
	  }
	| {
			type: "datetime-selector";
			selector: string;
	  }
	| {
			type: "datetime-value";
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
	  }
	| {
			type: "toggle-exact";
	  }
	| {
			type: "tags-search";
			e: React.ChangeEvent<HTMLInputElement>;
	  };

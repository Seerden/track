import { produce } from "immer";
import type { Dispatch, SetStateAction } from "react";
import type {
	ActivityFilterWithValues,
	FilterResetAction,
	FilterUpdateAction,
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultFilter } from "@/components/activities/ActivityFilter/lib/constants";
import { createDate } from "@/lib/datetime/make-date";

export default function useActivityFilterActions({
	setFilter,
}: {
	setFilter: Dispatch<SetStateAction<ActivityFilterWithValues>>;
}) {
	// TODO: maybe don't implement the functions as event handlers, just pass the
	// values to the reducer.

	function resetFilter(action: FilterResetAction) {
		setFilter(
			produce((draft) => {
				switch (action.type) {
					case "datetime":
						draft.datetime = defaultFilter.datetime;
						break;
					case "name-value":
						draft.name.value = null;
						break;
					case "name-filter":
						draft.name = defaultFilter.name;
						break;
				}
			})
		);
	}

	function updateFilter(action: FilterUpdateAction) {
		setFilter(
			produce((draft) => {
				switch (action.type) {
					case "datetime-modifier":
						draft.datetime.modifier =
							action.value as ActivityFilterWithValues["datetime"]["modifier"];
						break;
					case "datetime-selector":
						draft.datetime.selector =
							action.selector as ActivityFilterWithValues["datetime"]["selector"];
						break;
					case "datetime-value":
						if (!action.value) break;
						if (!draft.datetime.value) draft.datetime.value = [];
						draft.datetime.value[action.index] = createDate(action.value);
						break;
					case "name-type":
						draft.name.type = action.e.target
							.value as ActivityFilterWithValues["name"]["type"];
						break;
					case "name-value":
						draft.name.value = action.e.target.value;
						break;
				}
			})
		);
	}

	const actions = {
		reset: {
			name: {
				all: () => resetFilter({ type: "name-filter" }),
				value: () => resetFilter({ type: "name-value" }),
			},
			datetime: () => resetFilter({ type: "datetime" }),
			tags: {
				value: () => resetFilter({ type: "tags-value" }),
				search: () => resetFilter({ type: "tags-search" }),
			},
		},
		set: {
			name: {
				type: (e: React.ChangeEvent<HTMLSelectElement>) =>
					updateFilter({ type: "name-type", e }),
				value: (e: React.ChangeEvent<HTMLInputElement>) =>
					updateFilter({ type: "name-value", e }),
			},
			datetime: {
				modifier: (value: string) =>
					updateFilter({ type: "datetime-modifier", value }),
				selector: (selector: string) =>
					updateFilter({ type: "datetime-selector", selector }),
				value: (value: Date | null, index: number) =>
					updateFilter({ type: "datetime-value", value, index }),
			},
		},
	};

	return actions;
}

export type ActivityFilterActions = ReturnType<typeof useActivityFilterActions>;

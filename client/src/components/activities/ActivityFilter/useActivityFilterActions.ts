import type {
	ActivityFilterWithValues,
	FilterResetAction,
	FilterUpdateAction
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultFilter } from "@/components/activities/ActivityFilter/constants";
import { getTreeMembers } from "@/components/activities/ActivityFilter/tag-branch";
import { createDate } from "@/lib/datetime/make-date";
import type { TagsData, TagsTreeData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";

export default function useActivityFilterActions({
	setActiveTagIds,
	wholeTree,
	tagsById,
	tagsTreeById,
	setFilter
}: {
	setActiveTagIds: Dispatch<SetStateAction<ID[]>>;
	wholeTree: boolean;
	tagsById: TagsData["byId"] | undefined;
	tagsTreeById: TagsTreeData["byId"] | undefined;
	setFilter: Dispatch<SetStateAction<ActivityFilterWithValues>>;
}) {
	const updateActiveTagIds = useCallback(
		(tag_id: ID, type: "on" | "off") => {
			if (!tagsById || !tagsTreeById) return;

			setActiveTagIds(
				produce((draft) => {
					const members = !wholeTree
						? [tag_id]
						: getTreeMembers(tag_id, tagsById, tagsTreeById);

					switch (type) {
						case "on":
							draft.push(...members);
							break;
						case "off":
							draft.length = 0;
					}
				})
			);
		},
		[setActiveTagIds, wholeTree, tagsById, tagsTreeById]
	);

	const setFilterTags = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (!tagsById || !tagsTreeById) return;

			const tag_id = +e.currentTarget.value;

			setFilter(
				produce((draft) => {
					if (!draft.tags.value) {
						draft.tags.value = [];
					}

					const members = wholeTree
						? getTreeMembers(tag_id, tagsById, tagsTreeById)
						: [tag_id];

					if (draft.tags.value.includes(tag_id)) {
						draft.tags.value = draft.tags.value.filter(
							(id) => !members.includes(id)
						);
					} else {
						draft.tags.value.push(...members);
					}
				})
			);
		},
		[tagsById, tagsTreeById, wholeTree]
	);

	// TODO: maybe don't implement the functions as event handlers, just pass the
	// values to the reducer.

	function resetFilter(action: FilterResetAction) {
		setFilter(
			produce((draft) => {
				switch (action.type) {
					case "datetime-filter":
						draft.datetime = defaultFilter.datetime;
						break;
					case "filter-name":
						draft.name.value = null;
						break;
					case "name-filter":
						draft.name = defaultFilter.name;
						break;
					case "tags-filter":
						draft.tags = defaultFilter.tags;
						break;
				}
			})
		);
	}

	function updateFilter(action: FilterUpdateAction) {
		setFilter(
			produce((draft) => {
				switch (action.type) {
					case "active-tag-ids":
						break;
					case "datetime-filter-modifier":
						draft.datetime.modifier =
							action.value as ActivityFilterWithValues["datetime"]["modifier"];
						break;
					case "datetime-filter-selector":
						draft.datetime.selector =
							action.selector as ActivityFilterWithValues["datetime"]["selector"];
						break;
					case "datetime-filter-value":
						if (!action.value) break;
						if (!draft.datetime.value) draft.datetime.value = [];
						draft.datetime.value[action.index] = createDate(action.value);
						break;
					case "filter-name-type":
						draft.name.type = action.e.target
							.value as ActivityFilterWithValues["name"]["type"];
						break;
					case "filter-name-value":
						draft.name.value = action.e.target.value;
						break;
					case "filter-tags-type":
						draft.tags.type = action.e.target
							.value as ActivityFilterWithValues["tags"]["type"];

						break;
				}
			})
		);
	}

	const actions = {
		reset: {
			name: {
				all: () => resetFilter({ type: "name-filter" }),
				value: () => resetFilter({ type: "filter-name" })
			},
			datetime: () => resetFilter({ type: "datetime-filter" }),
			tags: () => resetFilter({ type: "tags-filter" })
		},
		set: {
			tags: {
				value: setFilterTags,
				type: (e: React.ChangeEvent<HTMLSelectElement>) =>
					updateFilter({ type: "filter-tags-type", e })
			},
			name: {
				type: (e: React.ChangeEvent<HTMLSelectElement>) =>
					updateFilter({ type: "filter-name-type", e }),
				value: (e: React.ChangeEvent<HTMLInputElement>) =>
					updateFilter({ type: "filter-name-value", e })
			},
			datetime: {
				modifier: (value: string) =>
					updateFilter({ type: "datetime-filter-modifier", value }),
				selector: (selector: string) =>
					updateFilter({ type: "datetime-filter-selector", selector }),
				value: (value: Date | null, index: number) =>
					updateFilter({ type: "datetime-filter-value", value, index })
			},
			activeTagIds: updateActiveTagIds
		}
	};

	return actions;
}

export type ActivityFilterActions = ReturnType<typeof useActivityFilterActions>;

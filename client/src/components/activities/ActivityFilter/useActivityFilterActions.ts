import type {
	ActivityFilterWithValues,
	FilterResetAction,
	FilterUpdateAction
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultFilter } from "@/components/activities/ActivityFilter/lib/constants";
import { getTreeMembers } from "@/components/activities/ActivityFilter/lib/tag-branch";
import { createDate } from "@/lib/datetime/make-date";
import type { TagsTreeData } from "@/types/data.types";
import type { TagWithIds } from "@shared/types/data/tag.types";
import type { ByIdMap, ID } from "@shared/types/data/utility.types";
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
	tagsById: ByIdMap<TagWithIds> | undefined;
	tagsTreeById: ByIdMap<TagsTreeData["byId"][number]> | undefined;
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
					case "datetime":
						draft.datetime = defaultFilter.datetime;
						break;
					case "name-value":
						draft.name.value = null;
						break;
					case "name-filter":
						draft.name = defaultFilter.name;
						break;
					case "tags-value":
						draft.tags = defaultFilter.tags;
						break;
					case "tags-search":
						draft.tags.search = "";
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
					case "filter-tags-type":
						draft.tags.type = action.e.target
							.value as ActivityFilterWithValues["tags"]["type"];
						break;
					case "toggle-exact":
						draft.tags.exact = !draft.tags.exact;
						break;
				}
			})
		);
	}

	const actions = {
		reset: {
			name: {
				all: () => resetFilter({ type: "name-filter" }),
				value: () => resetFilter({ type: "name-value" })
			},
			datetime: () => resetFilter({ type: "datetime" }),
			tags: {
				value: () => resetFilter({ type: "tags-value" }),
				search: () => resetFilter({ type: "tags-search" })
			}
		},
		set: {
			tags: {
				value: setFilterTags,
				type: (e: React.ChangeEvent<HTMLSelectElement>) =>
					updateFilter({ type: "filter-tags-type", e }),
				toggleExact: () => updateFilter({ type: "toggle-exact" }),
				search: (e: React.ChangeEvent<HTMLInputElement>) =>
					updateFilter({ type: "tags-search", e })
			},
			name: {
				type: (e: React.ChangeEvent<HTMLSelectElement>) =>
					updateFilter({ type: "name-type", e }),
				value: (e: React.ChangeEvent<HTMLInputElement>) =>
					updateFilter({ type: "name-value", e })
			},
			datetime: {
				modifier: (value: string) =>
					updateFilter({ type: "datetime-modifier", value }),
				selector: (selector: string) =>
					updateFilter({ type: "datetime-selector", selector }),
				value: (value: Date | null, index: number) =>
					updateFilter({ type: "datetime-value", value, index })
			},
			activeTagIds: updateActiveTagIds
		}
	};

	return actions;
}

export type ActivityFilterActions = ReturnType<typeof useActivityFilterActions>;

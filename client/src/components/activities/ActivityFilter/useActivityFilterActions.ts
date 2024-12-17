import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
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

	function setFilterTagsType(e: React.ChangeEvent<HTMLSelectElement>) {
		setFilter(
			produce((draft) => {
				draft.tags.type = e.target.value as ActivityFilterWithValues["tags"]["type"];
			})
		);
	}

	// TODO: instead of a billion functions, we could have a single function with
	// a dispatch-like shape. Or just use a reducer.
	// Also, maybe don't implement the functions as event handlers, just pass the
	// values to the reducer.

	function resetTagsFilter() {
		setFilter(
			produce((draft) => {
				draft.tags = defaultFilter.tags;
			})
		);
	}

	function setFilterNameType(e: React.ChangeEvent<HTMLSelectElement>) {
		setFilter(
			produce((draft) => {
				draft.name.type = e.target.value as ActivityFilterWithValues["name"]["type"];
			})
		);
	}

	function setFilterNameValue(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(
			produce((draft) => {
				draft.name.value = e.target.value;
			})
		);
	}

	function resetFilterName() {
		setFilter(
			produce((draft) => {
				draft.name.value = null;
			})
		);
	}

	function setDatetimeFilterModifier(value: string) {
		setFilter(
			produce((draft) => {
				draft.datetime.modifier =
					value as ActivityFilterWithValues["datetime"]["modifier"];
			})
		);
	}

	function setDatetimeFilterSelector(selector: string) {
		setFilter(
			produce((draft) => {
				draft.datetime.selector =
					selector as ActivityFilterWithValues["datetime"]["selector"];
			})
		);
	}

	function setDatetimeFilterValue(value: Date | null, index: number) {
		if (!value) return;
		setFilter(
			produce((draft) => {
				if (!draft.datetime.value) draft.datetime.value = [];
				draft.datetime.value[index] = createDate(value);
			})
		);
	}

	function resetNameFilter() {
		setFilter(
			produce((draft) => {
				draft.name = defaultFilter.name;
			})
		);
	}

	function resetDatetimeFilter() {
		setFilter(
			produce((draft) => {
				draft.datetime = defaultFilter.datetime;
			})
		);
	}

	const actions = {
		reset: {
			tags: resetTagsFilter,
			name: {
				value: resetFilterName,
				all: resetNameFilter
			},
			datetime: resetDatetimeFilter
		},
		set: {
			tags: {
				value: setFilterTags,
				type: setFilterTagsType
			},
			name: {
				type: setFilterNameType,
				value: setFilterNameValue
			},
			datetime: {
				modifier: setDatetimeFilterModifier,
				selector: setDatetimeFilterSelector,
				value: setDatetimeFilterValue
			},
			activeTagIds: updateActiveTagIds
		}
	};

	return actions;
}

export type ActivityFilterActions = ReturnType<typeof useActivityFilterActions>;

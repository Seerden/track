import { byIdAsList } from "@shared/lib/map";
import type { ID } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import {
	type TagFilter,
	tagFilterAtom,
} from "@/components/activities/ActivityFilter/tag-filter.atom";
import { getTreeMembers } from "@/components/tags/TagFilter/tag-branch";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { useToggle } from "@/lib/hooks/useToggle";
import { trpc } from "@/lib/trpc";

export function useTagFilter() {
	const { data: tags } = useQueryTags();
	const { data: tagsTree } = useQuery(trpc.tags.tree.queryOptions());
	const [tagFilter, setTagFilter] = useAtom(tagFilterAtom);
	const [activeTagIds, setActiveTagIds] = useState<ID[]>([]);
	const [[wholeTree], toggleWholeTree] = useToggle(false);
	const tagList = byIdAsList(tags);

	const filteredTags = useMemo(() => {
		// The tags we display are the ones that match the search query, but
		// selected tags are always displayed regardless of the search query.
		// TODO: do we display the selected tags separately from the search results?
		return tagList.filter(
			(tag) =>
				tag.name.toLowerCase().includes(tagFilter.search.toLowerCase()) ||
				tagFilter.value?.includes(tag.tag_id)
		);
	}, [tagList, tagFilter.search, tagFilter.value]);

	const noTagsFound =
		filteredTags.length === 0 &&
		tagFilter.search.length > 0 &&
		tagList.length > 0;

	const isActiveTag = (id: ID) => activeTagIds.includes(id);
	const isSelectedTag = (id: ID) => tagFilter.value?.includes(id);

	const updateActiveTagIds = useCallback(
		(tag_id: ID, type: "on" | "off") => {
			if (!tags || !tagsTree) return;

			setActiveTagIds(
				produce((draft) => {
					const members = !wholeTree
						? [tag_id]
						: getTreeMembers(tag_id, tags, tagsTree);

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
		[setActiveTagIds, wholeTree, tags, tagsTree]
	);

	const setFilterTags = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (!tags || !tagsTree) return;

			const tag_id = e.currentTarget.value;

			setTagFilter(
				produce((draft) => {
					if (!draft.value) {
						draft.value = [];
					}

					const members = wholeTree
						? getTreeMembers(tag_id, tags, tagsTree)
						: [tag_id];

					if (draft.value.includes(tag_id)) {
						draft.value = draft.value.filter((id) => !members.includes(id));
					} else {
						draft.value.push(...members);
					}
				})
			);
		},
		[tags, tagsTree, wholeTree]
	);

	function setTagSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setTagFilter(
			produce((draft) => {
				draft.search = e.target.value;
			})
		);
	}

	function setTagFilterType(type: TagFilter["type"]) {
		setTagFilter(
			produce((draft) => {
				draft.type = type;
			})
		);
	}

	function resetTagSearch() {
		setTagFilter(
			produce((draft) => {
				draft.search = "";
			})
		);
	}

	function toggleExact() {
		setTagFilter(
			produce((draft) => {
				draft.exact = !draft.exact;
			})
		);
	}

	function resetTagsValue() {
		setTagFilter(
			produce((draft) => {
				draft.value = null;
			})
		);
	}

	const actions = {
		reset: {
			value: resetTagsValue,
			search: resetTagSearch,
		},
		set: {
			toggleExact,
			toggleWholeTree,
			type: setTagFilterType,
			search: setTagSearch,
			updateActiveTagIds,
			tags: setFilterTags,
		},
	};

	return {
		actions,
		tagFilter,
		filteredTags,
		noTagsFound,
		wholeTree,
		isSelectedTag,
		isActiveTag,
	};
}

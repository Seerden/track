import type { ActivityFilterProps } from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultFilter } from "@/components/activities/ActivityFilter/constants";
import useActivityFilterActions from "@/components/activities/ActivityFilter/useActivityFilterActions";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useQueryTagsTree from "@/lib/hooks/query/tags/useQueryTagsTree";
import type { ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useActivityFilter({ onChange }: ActivityFilterProps) {
	const { data: tagsData } = useQueryTags();
	const { data: tagsTreeData } = useQueryTagsTree();
	const [filter, setFilter] = useState<ActivityFilterWithValues>(defaultFilter);
	// TODO: instead of tagSearch state, add this to the filter state -- for
	// wholeTree and activeTagIds, I think we do keep it separate, because it's
	// only UI state, not filter state.
	const [tagSearch, setTagSearch] = useState<string>("");
	const [wholeTree, setWholeTree] = useState(false);
	const [activeTagIds, setActiveTagIds] = useState<ID[]>([]);

	function toggleWholeTree() {
		setWholeTree((current) => !current);
	}

	const isProbablySuspended = !tagsData || !tagsTreeData;

	function toggleExact() {
		setFilter(
			produce((draft) => {
				draft.tags.exact = !draft.tags.exact;
			})
		);
	}

	useEffect(() => {
		onChange(filter);
	}, [filter, onChange]);

	const actions = useActivityFilterActions({
		setActiveTagIds,
		wholeTree,
		tagsById: tagsData?.byId,
		tagsTreeById: tagsTreeData?.byId,
		setFilter
	});

	const isActiveTag = useCallback(
		(tag_id: ID) => activeTagIds.includes(tag_id),
		[activeTagIds]
	);

	const getTagBackgroundColor = useCallback(
		(tag_id: ID) => {
			if (filter.tags.value?.includes(tag_id)) {
				if (isActiveTag(tag_id)) return "darkorange";
				return "orange";
			}
			if (isActiveTag(tag_id)) return "#ddd";
			return "white";
		},
		[filter.tags.value, isActiveTag]
	);

	const _tags = Object.values(tagsData?.byId ?? {});
	const tags = useMemo(() => {
		// The tags we display are the ones that match the search query, but
		// selected tags are always displayed regardless of the search query.
		// TODO: do we display the selected tags separately from the search results?
		return _tags.filter(
			(tag) =>
				tag.name.toLowerCase().includes(tagSearch.toLowerCase()) ||
				filter.tags.value?.includes(tag.tag_id)
		);
	}, [_tags, tagSearch, filter.tags.value]);

	const noTagsFound = tags.length === 0 && tagSearch.length > 0 && _tags.length > 0;

	if (isProbablySuspended) return { isProbablySuspended };

	return {
		isProbablySuspended,
		filter,
		tagSearch,
		setTagSearch,
		noTagsFound,
		tags,
		getTagBackgroundColor,
		actions,
		wholeTree,
		toggleWholeTree,
		toggleExact
	};
}

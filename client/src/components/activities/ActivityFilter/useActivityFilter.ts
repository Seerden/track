import type { ActivityFilterProps } from "@/components/activities/ActivityFilter/ActivityFilter";
import type {
	ActivityFilterTabs,
	ActivityFilterWithValues
} from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { defaultFilter } from "@/components/activities/ActivityFilter/lib/constants";
import useActivityFilterActions from "@/components/activities/ActivityFilter/useActivityFilterActions";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useQueryTagsTree from "@/lib/hooks/query/tags/useQueryTagsTree";
import type { ID } from "@shared/types/data/utility.types";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useActivityFilter({ onChange }: ActivityFilterProps) {
	const { data: tagsData } = useQueryTags();
	const { data: tagsTreeData } = useQueryTagsTree();
	const [filter, setFilter] = useState<ActivityFilterWithValues>(defaultFilter);
	const [wholeTree, setWholeTree] = useState(false);
	const [activeTagIds, setActiveTagIds] = useState<ID[]>([]);
	const [activeTab, setActiveTab] = useState<`${ActivityFilterTabs}`>("name");
	function toggleWholeTree() {
		setWholeTree((current) => !current);
	}

	const isProbablySuspended = !tagsData || !tagsTreeData;

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

	const isSelectedTag = useCallback(
		(tag_id: ID) => filter.tags.value?.includes(tag_id),
		[filter.tags.value]
	);

	const _tags = Object.values(tagsData?.byId ?? {});
	const tags = useMemo(() => {
		// The tags we display are the ones that match the search query, but
		// selected tags are always displayed regardless of the search query.
		// TODO: do we display the selected tags separately from the search results?
		return _tags.filter(
			(tag) =>
				tag.name.toLowerCase().includes(filter.tags.search.toLowerCase()) ||
				filter.tags.value?.includes(tag.tag_id)
		);
	}, [_tags, filter.tags.search, filter.tags.value]);

	const noTagsFound =
		tags.length === 0 && filter.tags.search.length > 0 && _tags.length > 0;

	if (isProbablySuspended) return { isProbablySuspended };

	return {
		isProbablySuspended,
		filter,
		noTagsFound,
		tags,
		actions,
		wholeTree,
		toggleWholeTree,
		isActiveTag,
		isSelectedTag,
		activeTab,
		setActiveTab
	};
}

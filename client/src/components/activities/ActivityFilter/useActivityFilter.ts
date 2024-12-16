import type { ActivityFilterProps } from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { createDate } from "@/lib/datetime/make-date";
import useQueryTags from "@/lib/hooks/query/tags/useQueryTags";
import useQueryTagsTree from "@/lib/hooks/query/tags/useQueryTagsTree";
import type { TagWithIds } from "@t/data/tag.types";
import type { ById, ID } from "@t/data/utility.types";
import { produce } from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";

const defaultFilter: ActivityFilterWithValues = {
	datetime: {
		modifier: "starts",
		selector: "after",
		value: null
	},
	name: {
		type: "includes",
		value: null
	},
	tags: {
		type: "includes",
		exact: true,
		value: null
	}
};

export default function useActivityFilter({ onChange }: ActivityFilterProps) {
	const { data: tagsData } = useQueryTags();
	const { data: tagsTreeData } = useQueryTagsTree();

	const isProbablySuspended = !tagsData || !tagsTreeData;

	const [filter, setFilter] = useState<ActivityFilterWithValues>(defaultFilter);
	const [tagSearch, setTagSearch] = useState<string>("");

	useEffect(() => {
		onChange(filter);
	}, [filter, onChange]);

	const [activeTagIds, setActiveTagIds] = useState<ID[]>([]);

	const isActiveTag = useCallback(
		(tag_id: ID) => activeTagIds.includes(tag_id),
		[activeTagIds]
	);

	const updateActiveTagIds = useCallback(
		(tag_id: ID, type: "on" | "off") => {
			setActiveTagIds(
				produce((draft) => {
					const members = filter.tags.exact
						? [tag_id]
						: getTreeMembers(
								tag_id,
								tagsData?.byId ?? {},
								tagsTreeData?.byId ?? {}
							);

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
		[setActiveTagIds, filter.tags.exact, tagsData, tagsTreeData]
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

	useEffect(() => {
		console.log({ filter });
	}, [filter]);

	const setFilterTags = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const tag_id = +e.currentTarget.value;
			const tagsById = tagsData?.byId ?? {};
			const tagsTreeById = tagsTreeData?.byId ?? {};

			setFilter(
				produce((draft) => {
					if (!draft.tags.value) draft.tags.value = [];
					const members = draft.tags.exact
						? [tag_id]
						: getTreeMembers(tag_id, tagsById, tagsTreeById);
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
		[filter, tagsData, tagsTreeData]
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

	const tree = tagsTreeData?.byId || {};

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

	// this basically already exists in build-branch.ts, so extract it from there
	function getRootTagId(tag_id: ID, tagsById: ById<TagWithIds>) {
		const tag = tagsById[tag_id];
		if (!tag) return;
		if (!tag.parent_id) return tag.tag_id;
		if (tag.parent_id) return getRootTagId(tag.parent_id, tagsById);
		return;
	}

	function getTreeMembers(
		tag_id: ID,
		tagsById: ById<TagWithIds>,
		tagTree: typeof tree
	): ID[] {
		const rootTagId = getRootTagId(tag_id, tagsById);
		if (!rootTagId) return [];
		return tagTree[rootTagId].members;
	}

	const noTagsFound = tags.length === 0 && tagSearch.length > 0 && _tags.length > 0;

	if (isProbablySuspended) return { isProbablySuspended };

	return {
		isProbablySuspended,
		filter,
		setFilterNameType,
		setFilter,
		tagSearch,
		setTagSearch,
		noTagsFound,
		tags,
		getTagBackgroundColor,
		updateActiveTagIds,
		setFilterTags,
		setDatetimeFilterModifier,
		setDatetimeFilterSelector,
		setDatetimeFilterValue,
		resetFilterName,
		setFilterNameValue,
		resetNameFilter,
		resetDatetimeFilter,
		resetTagsFilter
	};
}

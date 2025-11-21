import { byIdAsList } from "@shared/lib/map";
import type { ID, Nullable } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { atom, useAtom } from "jotai";
import { LucideBlend, LucideNetwork } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	ClearInputButton,
	ResetButton,
} from "@/components/activities/ActivityFilter/ActivityFilter";
import { getTreeMembers } from "@/components/activities/ActivityFilter/lib/tag-branch";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import { trpc } from "@/lib/trpc";
import S from "./style/ActivityFilter.style";

export type TagFilter = {
	type: "includes" | "excludes";
	/** if `!exact`, it considers all ids from the tree that `id` is part of. */
	exact?: boolean;
	search: string;
	value: Nullable<ID[]>;
};
const tagFilterTypes = ["includes", "excludes"] as const satisfies Array<
	TagFilter["type"]
>;
const defaultTagFilter: TagFilter = {
	type: "includes",
	exact: true,
	search: "",
	value: null,
};

export const tagFilterAtom = atom<TagFilter>(defaultTagFilter);

export default function TagsTab() {
	const { data: tags } = useQueryTags();
	const { data: tagsTree } = useQuery(trpc.tags.tree.queryOptions());
	const [tagFilter, setTagFilter] = useAtom(tagFilterAtom);
	const [activeTagIds, setActiveTagIds] = useState<ID[]>([]);
	const [wholeTree, setWholeTree] = useState(false);
	const tagList = byIdAsList(tags);

	useEffect(() => {
		console.log({ tagFilter });
	}, [tagFilter]);

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

	function isActiveTag(id: ID) {
		return activeTagIds.includes(id);
	}

	function isSelectedTag(id: ID) {
		// TODO: why is value nullable?
		return tagFilter.value?.includes(id);
	}

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

	function setTagFilterType(e: React.ChangeEvent<HTMLSelectElement>) {
		// actions.set.tags.type
		setTagFilter(
			produce((draft) => {
				draft.type = e.target.value as TagFilter["type"];
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
		// actions.set.tags.toggleExact
		setTagFilter(
			produce((draft) => {
				draft.exact = !draft.exact;
			})
		);
	}

	function toggleWholeTree() {
		setWholeTree((current) => !current);
	}

	function resetTagsValue() {
		setTagFilter(
			produce((draft) => {
				draft.value = null;
			})
		);
	}

	return (
		<S.Section>
			<ResetButton onClick={resetTagsValue} />
			<S.SectionContent>
				<S.SectionActionBar>
					<S.InputWithSelect style={{ position: "relative" }}>
						<S.Select onChange={setTagFilterType}>
							{tagFilterTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</S.Select>
						<S.Input
							type="text"
							value={tagFilter.search}
							onChange={setTagSearch}
						/>
						{tagFilter.search.length > 0 && (
							<ClearInputButton onClick={resetTagSearch} />
						)}
					</S.InputWithSelect>
					<S.Toggle
						role="button"
						onClick={toggleExact}
						$active={tagFilter.exact}
						title="Exact match?"
					>
						<LucideBlend size={15} />
					</S.Toggle>
					<S.Toggle
						role="button"
						onClick={toggleWholeTree}
						$active={wholeTree}
						title="Select tree?"
					>
						<LucideNetwork size={15} />
					</S.Toggle>
				</S.SectionActionBar>
				<S.TagSelectionList>
					{tagList?.map(({ tag_id, name }) => {
						return (
							<S.TagChip
								$selected={isSelectedTag(tag_id)}
								$active={isActiveTag(tag_id)}
								onMouseEnter={() => updateActiveTagIds(tag_id, "on")}
								onMouseLeave={() => updateActiveTagIds(tag_id, "off")}
								key={tag_id}
								value={tag_id}
								onClick={setFilterTags}
							>
								{name}
							</S.TagChip>
						);
					})}

					{noTagsFound && <p>No tags found that match the search query.</p>}
				</S.TagSelectionList>
			</S.SectionContent>
		</S.Section>
	);
}

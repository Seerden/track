import { useTagSelection } from "@lib/state/selected-tags-state";
import { byIdAsList } from "@shared/lib/map";
import type { TagsInTree } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useState } from "react";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";

export const tagSelectorId = "default-tag-selector";

// TODO: handle case where maximum > 1.
export default function useTagSelector({
	id,
	maximum,
	tags: initialTags,
}: {
	id: string;
	maximum?: number;
	tags?: TagsInTree;
}) {
	const { data: tags } = useQueryTags();

	const {
		tagSelection,
		selectedTagIds,
		setTagSelection,
		toggleTagSelection,
		resetTagSelection,
	} = useTagSelection(id);

	const [filter, setFilter] = useState<string>("");

	function updateFilter(e: ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value);
	}

	function clearFilter(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setFilter("");
	}

	function updateTagSelection(tagId: ID) {
		if (maximum === 1) {
			setTagSelection(
				produce((draft) => {
					if (!draft.has(id)) {
						draft.set(id, new Set());
					}
					draft.get(id)?.clear();
					draft.get(id)?.add(tagId);
				})
			);
		} else {
			toggleTagSelection(tagId);
		}
	}

	function onSelectionReset(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		resetTagSelection();
	}

	const tagList = byIdAsList(initialTags ?? tags);

	const filteredTags = tagList.filter((tag) =>
		tag.name.toLowerCase().includes(filter.toLowerCase())
	);

	const selectedTags = useMemo(
		() => tagList.filter((tag) => selectedTagIds.includes(tag.tag_id)),
		[tags, selectedTagIds]
	);

	return {
		tagSelection,
		updateTagSelection,
		filter,
		updateFilter,
		clearFilter,
		selectedTagIds,
		onSelectionReset,
		filteredTags,
		selectedTags,
		tags: tagList,
	};
}

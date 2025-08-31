import { useTagSelection } from "@lib/state/selected-tags-state";
import { isNullish } from "@shared/lib/is-nullish";
import { byIdAsList } from "@shared/lib/map";
import type { TagsInTree } from "@shared/lib/schemas/tag";
import type { ID } from "@shared/types/data/utility.types";
import { produce } from "immer";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import modalIds, { type ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import useTagSelectorFilter from "./useTagSelectorFilter";

// TODO: handle case where maximum > 1.
export default function useTagSelector({
	id,
	maximum,
	tags: initialTags,
	modalId,
}: {
	id: string;
	maximum?: number;
	tags?: TagsInTree;
	modalId: ModalId;
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
						draft.set(id, []);
					}
					draft.set(id, [tagId]);
				})
			);
		} else {
			toggleTagSelection(tagId);
		}
	}

	function handleSelectionReset(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		resetTagSelection();
	}

	const tagList = byIdAsList(initialTags ?? tags);

	const filteredTags = tagList.filter((tag) =>
		tag.name.toLowerCase().includes(filter.toLowerCase())
	);

	const selectedTags = useMemo(() => {
		return selectedTagIds
			.map((id) => tagList.find((t) => t.tag_id === id))
			.filter((entry) => !isNullish(entry)) as typeof tagList;
	}, [tags, selectedTagIds]);

	const { dropdownRef, expandFilter, expanded, minimizeFilter } =
		useTagSelectorFilter();
	const tagSelectorRef = useRef<HTMLDivElement>(null);

	// NOTE: tagTreeModalId has to depend on `modalId` because we can have
	// multiple TagSelectors on the same page.
	const tagTreeModalId =
		`${modalIds.tagTree.tagSelector}-${modalId}` as ModalId;
	const { openModal } = useModalState();

	function handleModalOpen(e: MouseEvent) {
		e.stopPropagation();
		openModal(tagTreeModalId);
	}

	/** When focusing out of the dropdown, close the tag selector dropdown. */
	function handleDropdownBlur(e: React.FocusEvent) {
		e.stopPropagation();
		if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
			minimizeFilter();
		}
	}

	return {
		filter,
		selectedTagIds,
		selectedTags,
		tagSelection,
		tags: tagList,
		filteredTags,
		tagSelectorRef,
		expanded,
		dropdownRef,
		tagTreeModalId,
		clearFilter,
		handleSelectionReset,
		updateFilter,
		updateTagSelection,
		handleDropdownBlur,
		expandFilter,
		handleModalOpen,
		minimizeFilter,
	};
}

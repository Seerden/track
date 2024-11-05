import Filter from "@/components/TagSelector/Filter";
import Selection from "@/components/TagSelector/Selection";
import type { TagSelectorProps } from "@/components/TagSelector/tag-selector.types";
import TagSelectorItems from "@/components/TagSelector/TagSelectorItems";
import useTagSelectorFilter from "@/components/TagSelector/use-tag-selector-filter";
import TagTree from "@/components/TagTree/TagTree";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import type { MouseEvent } from "react";
import { FaChevronDown, FaChevronUp, FaExpand } from "react-icons/fa";
import { MdOutlineFilterListOff } from "react-icons/md";
import NewTagButton from "./NewTagButton";
import S from "./TagSelector.style";
import useTagSelector from "./useTagSelector";

export default function TagSelector(p: TagSelectorProps) {
	const t = useTagSelector({ maximum: p.maximum, tagsById: p.tagsById });
	const f = useTagSelectorFilter(p.modalId);

	// NOTE: tagTreeModalId has to depend on `modalId` because we can have
	// multiple TagSelectors on the same page.
	const tagTreeModalId = `${modalIds.tagTree.tagSelector}-${p.modalId}`;
	const { openModal } = useModalState(tagTreeModalId);

	function onModalOpen(e: MouseEvent) {
		e.stopPropagation();
		openModal();
	}

	return (
		<>
			<S.Wrapper $fullSize={p.fullSize}>
				{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
				{!!p.title && (
					<S.Title
						{...(p.maximum && { title: `Choose at most ${p.maximum} tag(s)` })}
					>
						{p.title}
					</S.Title>
				)}

				<S.Dropdown>
					<S.Actions>
						{!f.expanded && (
							<>
								<Filter
									filter={t.filter}
									updateFilter={t.updateFilter}
									clearFilter={t.clearFilter}
									onFocus={f.expandFilter}
								/>
								{!!t.selectedTagIds.length && (
									<S.DropdownTrigger onClick={t.onSelectionReset}>
										<MdOutlineFilterListOff color="orangered" />
									</S.DropdownTrigger>
								)}
								{p.showNewTagButton && <NewTagButton modalId={p.modalId} />}

								<S.DropdownTrigger onClick={f.expandFilter}>
									<FaChevronDown size={15} color={"darkorchid"} />
								</S.DropdownTrigger>
							</>
						)}
					</S.Actions>

					{!f.expanded &&
						(!t.selectedTags.length ? (
							<S.EmptySelection>
								You haven't selected any tags yet.
							</S.EmptySelection>
						) : (
							<Selection tags={t.tags} selectedTags={t.selectedTags} />
						))}

					{f.expanded && (
						<S.DropdownContent ref={f.dropdownRef}>
							<S.DropdownActions>
								<Filter
									filter={t.filter}
									clearFilter={t.clearFilter}
									updateFilter={t.updateFilter}
									hasAutoFocus
								/>

								{!!t.selectedTagIds.length && (
									<S.DropdownTrigger onClick={t.onSelectionReset}>
										<MdOutlineFilterListOff color="orangered" />
									</S.DropdownTrigger>
								)}

								{p.showNewTagButton && <NewTagButton modalId={p.modalId} />}

								<S.DropdownTrigger onClick={onModalOpen}>
									<FaExpand size={15} color={"dodgerblue"} />
								</S.DropdownTrigger>

								<S.DropdownTrigger onClick={f.minimizeFilter}>
									<FaChevronUp size={15} color={"forestgreen"} />
								</S.DropdownTrigger>
							</S.DropdownActions>

							<S.List>
								<TagSelectorItems
									tags={t.tagsToDisplay}
									tagSelection={t.tagSelection}
									updateTagSelection={t.updateTagSelection}
								/>
							</S.List>

							<Selection fullPaths tags={t.tags} selectedTags={t.selectedTags} />
						</S.DropdownContent>
					)}
				</S.Dropdown>
			</S.Wrapper>
			{/* NOTE I don't think we need to conditionally render TagTree based on !!state.isOpen, 
            but if the modal ever acts weird, that's the first thing to try for a fix. */}
			<TagTree modalId={tagTreeModalId} />
		</>
	);
}

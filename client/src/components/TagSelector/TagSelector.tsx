import Filter from "@/components/TagSelector/Filter";
import Selection from "@/components/TagSelector/Selection";
import type { TagSelectorProps } from "@/components/TagSelector/tag-selector.types";
import TagSelectorItems from "@/components/TagSelector/TagSelectorItems";
import TagTree from "@/components/TagTree/TagTree";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import useClickOutside from "@/lib/use-click-outside";
import type { FocusEvent, MouseEvent } from "react";
import { useMemo, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaExpand } from "react-icons/fa";
import { MdOutlineFilterListOff } from "react-icons/md";
import NewTagButton from "./NewTagButton";
import S from "./TagSelector.style";
import useTagSelector from "./use-tag-selector";

export default function TagSelector(p: TagSelectorProps) {
	const t = useTagSelector({ maximum: p.maximum });

	// TODO: If tags are passed through props (=p.tagsById), they take priority over all the
	// user's tags (=t.tags.tagsById), We need to rename the variables to make that clear.
	const _tags = Object.values(p.tagsById ?? t.tags?.tagsById ?? []);

	const tagsToDisplay = _tags.filter((tag) =>
		tag.name.toLowerCase().includes(t.filter.toLowerCase())
	);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isOpen: expanded, setIsOpen: setExpanded } = useClickOutside({
		// TODO: make ref a standalone parameter so we don't have to always wrap it in an object
		ref: dropdownRef
	});
	// NOTE: tagTreeModalId has to depend on `modalId` because we can have
	// multiple TagSelectors on the same page.
	const tagTreeModalId = `${modalIds.tagTree.tagSelector}-${p.modalId}`;
	const { openModal } = useModalState(tagTreeModalId);

	const selectedTags = useMemo(
		() => _tags.filter((tag) => t.selectedTagIds.includes(tag.tag_id)),
		[p.tagsById, t.tags, t.selectedTagIds]
	);

	function expandFilter<T>(e?: MouseEvent<T> | FocusEvent<T>) {
		e?.stopPropagation();
		setExpanded(true);
	}

	function minimizeFilter(e: MouseEvent) {
		e.stopPropagation();
		setExpanded(false);
	}

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
						{!expanded && (
							<>
								<Filter
									filter={t.filter}
									updateFilter={t.updateFilter}
									clearFilter={t.clearFilter}
									onFocus={expandFilter}
								/>
								{!!t.selectedTagIds.length && (
									<S.DropdownTrigger onClick={t.onResetSelection}>
										<MdOutlineFilterListOff color="orangered" />
									</S.DropdownTrigger>
								)}
								{p.showNewTagButton && <NewTagButton modalId={p.modalId} />}

								<S.DropdownTrigger onClick={expandFilter}>
									<FaChevronDown size={15} color={"darkorchid"} />
								</S.DropdownTrigger>
							</>
						)}
					</S.Actions>
					{!expanded &&
						(!selectedTags.length ? (
							<S.EmptySelection>
								You haven't selected any tags yet.
							</S.EmptySelection>
						) : (
							<Selection tags={_tags} selectedTags={selectedTags} />
						))}

					{expanded && (
						<S.DropdownContent ref={dropdownRef}>
							<S.DropdownActions>
								<Filter
									filter={t.filter}
									clearFilter={t.clearFilter}
									updateFilter={t.updateFilter}
									hasAutoFocus
								/>
								{!!t.selectedTagIds.length && (
									<S.DropdownTrigger onClick={t.onResetSelection}>
										<MdOutlineFilterListOff color="orangered" />
									</S.DropdownTrigger>
								)}
								{p.showNewTagButton && <NewTagButton modalId={p.modalId} />}
								<S.DropdownTrigger onClick={onModalOpen}>
									<FaExpand size={15} color={"dodgerblue"} />
								</S.DropdownTrigger>
								<S.DropdownTrigger onClick={minimizeFilter}>
									<FaChevronUp size={15} color={"forestgreen"} />
								</S.DropdownTrigger>
							</S.DropdownActions>

							<S.List>
								<TagSelectorItems
									tags={tagsToDisplay}
									tagSelection={t.tagSelection}
									updateTagSelection={t.updateTagSelection}
								/>
							</S.List>
							<Selection fullPaths tags={_tags} selectedTags={selectedTags} />
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

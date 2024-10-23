import type {
	FilterProps,
	SelectionProps,
	TagSelectorItemProps,
	TagSelectorItemsProps,
	TagSelectorProps
} from "@/components/TagSelector/tag-selector.types";
import TagTree from "@/components/TagTree/TagTree";
import { useModalState } from "@/lib/state/modal-state";
import { makePath } from "@/lib/tag-path";
import useClickOutside from "@/lib/use-click-outside";
import type { TagWithIds } from "@type/server/tag.types";
import type { MouseEvent } from "react";
import { Fragment, useMemo, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaExpand } from "react-icons/fa";
import { MdOutlineClear, MdOutlineFilterListOff } from "react-icons/md";
import NewTagButton from "./NewTagButton";
import S from "./TagSelector.style";
import useTagSelector from "./use-tag-selector";

function TagSelectorItem(p: TagSelectorItemProps) {
	const hasParent = p.tag.parent_id !== null;
	const isSelected = p.tagSelection?.[+p.tag.tag_id] ?? false;

	return (
		<S.ListItem
			$hasParent={hasParent}
			$isSelected={isSelected}
			key={p.tag.tag_id}
			onClick={() => p.updateTagSelection(+p.tag.tag_id)}
		>
			{p.tag.name}
		</S.ListItem>
	);
}

function TagSelectorItems(p: TagSelectorItemsProps) {
	return p.tags.map((tag) => (
		<TagSelectorItem
			tagSelection={p.tagSelection}
			updateTagSelection={p.updateTagSelection}
			key={tag.tag_id}
			tag={tag}
		/>
	));
}

function Filter(p: FilterProps) {
	return (
		<S.FilterWrapper>
			<S.Filter
				onFocus={(e) => p.onFocus?.(e)}
				autoFocus={p.hasAutoFocus}
				type="text"
				placeholder="search categories"
				value={p.filter}
				onChange={p.updateFilter}
			/>
			<S.ClearFilter onClick={p.clearFilter}>
				<MdOutlineClear size={15} />
			</S.ClearFilter>
		</S.FilterWrapper>
	);
}

function Selection(p: SelectionProps) {
	if (!p.selectedTags.length) return null;

	function renderPath(tag: TagWithIds, tags: TagWithIds[]) {
		return (
			<S.SelectionItem key={tag.tag_id}>
				{p.fullPaths
					? makePath(tag, tags)
							.map((path, index) => (
								<Fragment key={index}>
									<S.PathPart $isLeaf={index === 0} key={path}>
										{path}
									</S.PathPart>
									{index !== 0 && "/"}
								</Fragment>
							))
							.reverse()
					: tag.name}
			</S.SelectionItem>
		);
	}

	return (
		<S.SelectionList>
			{p.selectedTags.map((tag) => renderPath(tag, p.tags))}
		</S.SelectionList>
	);
}

export default function TagSelector(p: TagSelectorProps) {
	const t = useTagSelector({ maximum: p.maximum });

	// TODO: this first looks if tags were manually passed, if not it uses all
	// of a user's tags. We need to rename the variables to make that clear.
	const tagsToDisplay = Object.values(p.tagsById ?? t.tags?.tagsById ?? []).filter(
		(tag) => tag.name.toLowerCase().includes(t.filter.toLowerCase())
	);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isOpen: expanded, setIsOpen: setExpanded } = useClickOutside({
		ref: dropdownRef
	});
	const _modalId = `${p.modalId}-thing`; // TODO: don't do this -- I have it like this because modalId is used for NewTagButton here
	const { openModal } = useModalState(_modalId);

	const _tags = Object.values(p.tagsById ?? t.tags?.tagsById ?? []);
	const selectedTags = useMemo(
		() => _tags.filter((tag) => t.selectedTagIds.includes(tag.tag_id)),
		[p.tagsById, t.tags, t.selectedTagIds]
	);

	function expandFilter(e: MouseEvent) {
		e.stopPropagation();
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
									onFocus={(e) => expandFilter}
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
			<TagTree modalId={_modalId} />
		</>
	);
}

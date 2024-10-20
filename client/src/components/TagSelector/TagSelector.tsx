import TagTree from "@/components/TagTree/TagTree";
import { useModalState } from "@/lib/state/modal-state";
import useClickOutside from "@/lib/use-click-outside";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import type { MouseEvent } from "react";
import { Fragment, useMemo, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaExpand } from "react-icons/fa";
import { MdOutlineClear, MdOutlineFilterListOff } from "react-icons/md";
import NewTagButton from "./NewTagButton";
import S from "./TagSelector.style";
import useTagSelector from "./use-tag-selector";

// These are passed from TagSelector > TagSelectorItems > TagSelectorItem
type SubcomponentProps = {
	tagSelection: Record<number, boolean>;
	updateTagSelection: (id: number) => void;
};

type TagSelectorItemProps = SubcomponentProps & {
	tag: TagWithIds;
};

function TagSelectorItem({
	tag,
	tagSelection,
	updateTagSelection
}: TagSelectorItemProps) {
	const hasParent = tag.parent_id !== null;
	const isSelected = tagSelection?.[+tag.tag_id] ?? false;
	return (
		<S.ListItem
			$hasParent={hasParent}
			$isSelected={isSelected}
			key={tag.tag_id}
			onClick={() => updateTagSelection(+tag.tag_id)}
		>
			{tag.name}
		</S.ListItem>
	);
}

type TagSelectorItemsProps = SubcomponentProps & {
	tags: TagWithIds[];
};

function TagSelectorItems({
	tags,
	tagSelection,
	updateTagSelection
}: TagSelectorItemsProps) {
	return tags.map((tag) => (
		<TagSelectorItem
			tagSelection={tagSelection}
			updateTagSelection={updateTagSelection}
			key={tag.tag_id}
			tag={tag}
		/>
	));
}

type TagSelectorProps = {
	title?: string;
	tagsById?: ById<TagWithIds>;
	fullSize?: boolean;
	maximum?: number;
	showNewTagButton?: boolean;
	modalId: string;
};

type FilterProps = {
	filter: string;
	updateFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
	clearFilter: (e: MouseEvent<HTMLButtonElement>) => void;
	onFocus?: () => void;
	hasAutoFocus?: boolean;
};

function Filter({
	filter,
	updateFilter,
	clearFilter,
	onFocus,
	hasAutoFocus
}: FilterProps) {
	return (
		<S.FilterWrapper>
			<S.Filter
				onFocus={() => onFocus?.()}
				autoFocus={hasAutoFocus}
				type="text"
				placeholder="search categories"
				value={filter}
				onChange={(e) => updateFilter(e)}
			/>
			<S.ClearFilter onClick={(e) => clearFilter(e)}>
				<MdOutlineClear size={15} />
			</S.ClearFilter>
		</S.FilterWrapper>
	);
}
function makePath(tag: TagWithIds | undefined, tags: TagWithIds[]): string[] {
	if (!tag) return [];

	if (!tag.parent_id) {
		return [tag.name];
	}
	return [
		tag.name,
		...makePath(
			tags.find((t) => t.tag_id === tag.parent_id),
			tags
		)
	].reverse();
}

function makePathString(pathArray: string[]) {
	return pathArray.join(">");
}

function Selection({
	selectedTags,
	tags,
	fullPaths = false
}: {
	selectedTags: TagWithIds[];
	tags: TagWithIds[];
	fullPaths?: boolean;
}) {
	if (!selectedTags.length) return null;

	return (
		<S.SelectionList>
			{selectedTags.map((tag) => (
				<S.SelectionItem key={tag.tag_id}>
					{fullPaths
						? makePath(tag, tags)
								.reverse()
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
			))}
		</S.SelectionList>
	);
}

export default function TagSelector({
	title,
	tagsById,
	fullSize,
	maximum,
	showNewTagButton,
	modalId
}: TagSelectorProps) {
	const {
		selectedTagIds,
		tagSelection,
		updateTagSelection,
		filter,
		updateFilter,
		clearFilter,
		tags,
		resetTagSelection
	} = useTagSelector({
		maximum
	});

	// TODO: this first looks if tags were manually passed, if not it uses all
	// of a user's tags. We need to rename the variables to make that clear.
	const tagsToDisplay = Object.values(tagsById ?? tags?.tagsById ?? []).filter((tag) =>
		tag.name.toLowerCase().includes(filter.toLowerCase())
	);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isOpen: expanded, setIsOpen: setExpanded } = useClickOutside({
		ref: dropdownRef
	});
	const _modalId = `${modalId}-thing`;
	const { openModal, state } = useModalState(_modalId);

	const _tags = Object.values(tagsById ?? tags?.tagsById ?? []);
	const selectedTags = useMemo(
		() => _tags.filter((t) => selectedTagIds.includes(t.tag_id)),
		[tags, selectedTagIds]
	);

	return (
		<>
			<S.Wrapper $fullSize={fullSize}>
				{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
				{!!title && (
					<S.Title {...(maximum && { title: `Choose at most ${maximum} tag(s)` })}>
						{title}
					</S.Title>
				)}
				<S.Dropdown>
					<S.Actions>
						{!expanded && (
							<>
								<Filter
									filter={filter}
									updateFilter={updateFilter}
									clearFilter={(e) => clearFilter(e)}
									onFocus={() => {
										console.log("HI");
										setExpanded(true);
									}}
								/>
								{!!selectedTagIds.length && (
									<S.DropdownTrigger
										onClick={(e) => {
											e.stopPropagation();
											resetTagSelection();
										}}
									>
										<MdOutlineFilterListOff color="orangered" />
									</S.DropdownTrigger>
								)}
								{showNewTagButton && <NewTagButton modalId={modalId} />}

								<S.DropdownTrigger
									onClick={(e) => {
										console.log("HI");
										e.stopPropagation();
										setExpanded(true);
									}}
								>
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
									filter={filter}
									clearFilter={(e) => clearFilter(e)}
									updateFilter={updateFilter}
									hasAutoFocus
								/>
								{!!selectedTagIds.length && (
									// TODO: vvv
									<S.DropdownTrigger
										onClick={(e) => {
											e.stopPropagation();
											resetTagSelection();
										}}
									>
										<MdOutlineFilterListOff color="orangered" />
									</S.DropdownTrigger>
								)}
								{showNewTagButton && <NewTagButton modalId={modalId} />}
								<S.DropdownTrigger onClick={openModal}>
									<FaExpand size={15} color={"dodgerblue"} />
								</S.DropdownTrigger>
								<S.DropdownTrigger
									onClick={(e) => {
										e.stopPropagation();
										setExpanded(false);
									}}
								>
									<FaChevronUp size={15} color={"forestgreen"} />
								</S.DropdownTrigger>
							</S.DropdownActions>

							<S.List>
								<>
									<TagSelectorItems
										tags={tagsToDisplay}
										tagSelection={tagSelection}
										updateTagSelection={updateTagSelection}
									/>
								</>
							</S.List>
							<Selection fullPaths tags={_tags} selectedTags={selectedTags} />
						</S.DropdownContent>
					)}
				</S.Dropdown>
			</S.Wrapper>
			{state.isOpen && <TagTree modalId={_modalId} />}
		</>
	);
}

// TODO: filter functionality
// TODO: hide children (recursively) when parent is selected and vice versa

import TagTree from "@/components/TagTree/TagTree";
import { useModalState } from "@/lib/state/modal-state";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaExpand } from "react-icons/fa";
import NewTagButton from "./NewTagButton";
import * as S from "./TagSelector.style";
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
};

function Filter({ filter, updateFilter }: FilterProps) {
	return (
		<S.Filter
			type="text"
			placeholder="search categories"
			value={filter}
			onChange={(e) => updateFilter(e)}
		/>
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
	const { tagSelection, updateTagSelection, filter, updateFilter, tags } =
		useTagSelector({
			maximum
		});

	// TODO: this first looks if tags were manually passed, if not it uses all
	// of a user's tags. We need to rename the variables to make that clear.
	const tagsToDisplay = Object.values(tagsById ?? tags?.tagsById ?? []).filter((tag) =>
		tag.name.toLowerCase().includes(filter.toLowerCase())
	);

	const [expanded, setExpanded] = useState<boolean>(true);
	const _modalId = `${modalId}-thing`;
	const { openModal, state } = useModalState(_modalId, true);

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
					{showNewTagButton && <NewTagButton modalId={modalId} />}
					<S.Actions>
						{!expanded && (
							<>
								<Filter filter={filter} updateFilter={updateFilter} />
								<S.DropdownTrigger
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setExpanded(true);
									}}
								>
									<FaChevronDown size={15} color={"darkorchid"} />
								</S.DropdownTrigger>
							</>
						)}
					</S.Actions>

					{expanded && (
						<S.DropdownContent>
							<S.DropdownActions>
								<Filter filter={filter} updateFilter={updateFilter} />
								<S.DropdownTrigger>
									<FaExpand
										size={15}
										color={"dodgerblue"}
										onClick={(e) => {
											console.log({ _modalId });
											e.preventDefault();
											e.stopPropagation();
											openModal();
										}}
									/>
								</S.DropdownTrigger>
								<S.DropdownTrigger
									onClick={(e) => {
										e.preventDefault();
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

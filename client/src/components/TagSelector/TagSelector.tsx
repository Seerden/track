import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
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
	oneLine?: boolean;
	showNewTagButton?: boolean;
	modalId: string;
};

export default function TagSelector({
	title,
	tagsById,
	fullSize,
	maximum,
	oneLine,
	showNewTagButton,
	modalId
}: TagSelectorProps) {
	const { tagSelection, updateTagSelection, filter, updateFilter, tags } =
		useTagSelector({
			maximum
		});

	// TODO: this first looks if tags were manually passed, if not it uses all
	// of a user's tags. We need to rename the variables to make that clear.
	const tagsToDisplay = Object.values(tagsById ?? tags?.tagsById ?? []);

	return (
		<S.Wrapper $fullSize={fullSize}>
			{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
			{!!title && (
				<S.Title {...(maximum && { title: `Choose at most ${maximum} tag(s)` })}>
					{title}
				</S.Title>
			)}
			{showNewTagButton && <NewTagButton modalId={modalId} />}
			<S.Filter
				type="text"
				placeholder="search categories"
				value={filter}
				onChange={(e) => updateFilter(e)}
			/>
			<S.List $oneLine={oneLine}>
				<TagSelectorItems
					tags={tagsToDisplay}
					tagSelection={tagSelection}
					updateTagSelection={updateTagSelection}
				/>
			</S.List>
		</S.Wrapper>
	);
}

// TODO: filter functionality
// TODO: hide children (recursively) when parent is selected and vice versa

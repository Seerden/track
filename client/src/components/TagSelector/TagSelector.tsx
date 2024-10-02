import { useMemo } from "react";
import type { TagWithIds } from "../../types/server/tag.types";
import type { ById } from "../../types/server/utility.types";
import NewTagButton from "./NewTagButton";
import * as S from "./TagSelector.style";
import useTagSelector from "./use-tag-selector";

type TagSelectorProps = {
	title?: string;
	tagsById?: ById<TagWithIds>;
	fullSize?: boolean;
	maximum?: number;
	oneLine?: boolean;
	showNewTagButton?: boolean;
};

export default function TagSelector({
	title,
	tagsById,
	fullSize,
	maximum,
	oneLine,
	showNewTagButton
}: TagSelectorProps) {
	const { tagSelection, updateTagSelection, filter, updateFilter, tags } =
		useTagSelector({
			maximum
		});

	const elements = useMemo(() => {
		// tags may not be fetched yet, so cannot do !tags?.tagsById, need it
		// written out like this
		if (!tagsById && tags && !tags.tagsById) return [];

		const elements: ById<JSX.Element> = Object.entries(tagsById ?? tags?.tagsById ?? {}) // this nullish coalescing is a bit of a mess
			.filter(([_, tag]) => {
				if (!filter) return true;
				return tag.name.toLowerCase().includes(filter.toLowerCase());
			})
			.reduce((acc, [id, tag]) => {
				const hasParent = tag.parent_id !== null;
				const isSelected = tagSelection?.[+id] ?? false;

				return {
					...acc,
					[id]: (
						<S.ListItem
							$hasParent={hasParent}
							$isSelected={isSelected}
							key={id}
							onClick={() => updateTagSelection(+id)}
						>
							{tag.name}
						</S.ListItem>
					)
				};
			}, {});
		return elements;
	}, [tags, tagsById, filter, tagSelection]);

	// TODO: extract as much of this into a separate component as possible (it
	// can live inside this file, still))

	return (
		<S.Wrapper $fullSize={fullSize}>
			{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
			{!!title && (
				<S.Title {...(maximum && { title: `Choose at most ${maximum} tag(s)` })}>
					{title}
				</S.Title>
			)}
			{showNewTagButton && <NewTagButton />}
			<S.Filter
				type="text"
				placeholder="search categories"
				value={filter}
				onChange={(e) => updateFilter(e)}
			/>
			<S.List $oneLine={oneLine}>{Object.values(elements)}</S.List>
		</S.Wrapper>
	);
}

// TODO: filter functionality
// TODO: hide children (recursively) when parent is selected and vice versa
// TODO: add a button that opens a modal to create a new tag -- do not show this
// when the TagSelector is being shown inside a NewTag component

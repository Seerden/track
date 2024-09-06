import { ID } from "../../types/server/utility.types";
import * as S from "./TagSelector.style";
import { mockTags } from "./mock";
import useTagSelector from "./use-tag-selector";

type TagSelectorProps = {
	title?: string;
	tags?: typeof mockTags; // TODO: properly type this
	maximum?: number;
};

export default function TagSelector({
	title = "Choose tags",
	tags = mockTags,
	maximum
}: TagSelectorProps) {
	const { tagSelection, updateTagSelection, filter, updateFilter } = useTagSelector({
		maximum
	});

	// TODO: extract as much of this into a separate component as possible (it
	// can live inside this file, still))
	const elements: Record<ID, JSX.Element> = Object.entries(tags)
		.filter(([_, tag]) => {
			return tag.name.toLowerCase().includes(filter.toLowerCase());
		})
		.reduce((acc, [id, tag]) => {
			const hasParent = tag.parent_id !== null;
			const isSelected = tagSelection[+id] ?? false;

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

	return (
		<S.Wrapper>
			{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
			<S.Title {...(maximum && { title: `Choose at most ${maximum} tag(s)` })}>
				{title}
			</S.Title>
			<S.Filter
				type="text"
				placeholder="search categories"
				value={filter}
				onChange={(e) => updateFilter(e)}
			/>
			<S.List>{Object.values(elements)}</S.List>
		</S.Wrapper>
	);
}

// TODO: filter functionality
// TODO: hide children (recursively) when parent is selected and vice versa
// TODO: add a button that opens a modal to create a new tag -- do not show this
// when the TagSelector is being shown inside a NewTag component

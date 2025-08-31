import {
	LucideChevronDown,
	LucideChevronUp,
	LucideFilterX,
	LucideMaximize,
} from "lucide-react";
import { type MouseEvent, useRef } from "react";
import Filter from "@/components/tags/TagSelector/Filter";
import Selection from "@/components/tags/TagSelector/Selection";
import { TagSelectorItems } from "@/components/tags/TagSelector/TagSelectorItems";
import type { TagSelectorProps } from "@/components/tags/TagSelector/tag-selector.types";
import useTagSelectorFilter from "@/components/tags/TagSelector/useTagSelectorFilter";
import TagTree from "@/components/tags/TagTree/TagTree";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Buttons from "@/lib/theme/components/buttons";
import NewTagButton from "./NewTagButton";
import S from "./style/TagSelector.style";
import useTagSelector from "./useTagSelector";

const Button = Buttons.Action.Alternative;

export default function TagSelector({
	tagSelectorId,
	modalId,
	fullSize,
	maximum,
	showNewTagButton,
	tags,
	title,
}: TagSelectorProps) {
	const {
		clearFilter,
		filter,
		handleSelectionReset,
		selectedTagIds,
		selectedTags,
		tagSelection,
		tags: selectorTags,
		filteredTags,
		updateFilter,
		updateTagSelection,
	} = useTagSelector({ maximum, tags, id: tagSelectorId });
	const { dropdownRef, expandFilter, expanded, minimizeFilter } =
		useTagSelectorFilter();
	const tagSelectorRef = useRef<HTMLDivElement>(null);

	// NOTE: tagTreeModalId has to depend on `modalId` because we can have
	// multiple TagSelectors on the same page.
	const tagTreeModalId =
		`${modalIds.tagTree.tagSelector}-${modalId}` as ModalId;
	const { openModal } = useModalState();

	function onModalOpen(e: MouseEvent) {
		e.stopPropagation();
		openModal(tagTreeModalId);
	}

	return (
		<>
			<S.Wrapper
				$fullSize={fullSize}
				ref={tagSelectorRef}
				onBlur={(e) => {
					e.stopPropagation();
					if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
						minimizeFilter();
					}
				}}>
				{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
				{!!title && (
					<S.Title
						{...(maximum && { title: `Choose at most ${maximum} tag(s)` })}>
						{title}
					</S.Title>
				)}

				<div
					style={{
						position: "relative",
						marginTop: "0.3rem",
					}}>
					<S.Actions>
						{!expanded && (
							<>
								<Filter
									filter={filter}
									updateFilter={updateFilter}
									clearFilter={clearFilter}
									onFocus={expandFilter}
								/>
								{/* TODO: we show this exact thing in two different places -- make it a subcomponent, or at least a render function */}
								{!!selectedTagIds.length && (
									<Button onClick={handleSelectionReset}>
										<LucideFilterX size={20} color="orangered" />
									</Button>
								)}
								{showNewTagButton && <NewTagButton modalId={modalId} />}

								<Button onClick={expandFilter}>
									<LucideChevronDown size={20} color={"darkorchid"} />
								</Button>
							</>
						)}
					</S.Actions>

					{!selectedTags.length ? (
						<S.EmptySelection>
							You haven't selected any tags yet.
						</S.EmptySelection>
					) : (
						<Selection tags={selectorTags} selectedTags={selectedTags} />
					)}

					{expanded && (
						<S.DropdownContent ref={dropdownRef}>
							<S.DropdownActions>
								<Filter
									filter={filter}
									clearFilter={clearFilter}
									updateFilter={updateFilter}
									hasAutoFocus
								/>

								{!!selectedTagIds.length && (
									<Button onClick={handleSelectionReset}>
										<LucideFilterX size={20} color="orangered" />
									</Button>
								)}

								<Button onClick={onModalOpen}>
									<LucideMaximize size={20} color="dodgerblue" />
								</Button>

								{showNewTagButton && <NewTagButton modalId={modalId} />}

								<Button onClick={minimizeFilter}>
									<LucideChevronUp size={20} color={"forestgreen"} />
								</Button>
							</S.DropdownActions>

							<S.List>
								<TagSelectorItems
									id={tagSelectorId}
									modalId={modalId}
									filteredTags={filteredTags}
									tagSelection={tagSelection}
									updateTagSelection={updateTagSelection}
								/>
							</S.List>

							<Selection
								fullPaths
								tags={selectorTags}
								selectedTags={selectedTags}
							/>
						</S.DropdownContent>
					)}
				</div>
			</S.Wrapper>
			{/* NOTE I don't think we need to conditionally render TagTree based on !!state.isOpen, 
            but if the modal ever acts weird, that's the first thing to try for a fix. */}
			<TagTree modalId={tagTreeModalId} />
		</>
	);
}

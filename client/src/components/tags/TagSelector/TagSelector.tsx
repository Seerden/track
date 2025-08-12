import Filter from "@/components/tags/TagSelector/Filter";
import Selection from "@/components/tags/TagSelector/Selection";
import type { TagSelectorProps } from "@/components/tags/TagSelector/tag-selector.types";
import TagSelectorItems from "@/components/tags/TagSelector/TagSelectorItems";
import useTagSelectorFilter from "@/components/tags/TagSelector/useTagSelectorFilter";
import TagTree from "@/components/tags/TagTree/TagTree";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import Buttons from "@/lib/theme/components/buttons";
import {
	LucideChevronDown,
	LucideChevronUp,
	LucideFilterX,
	LucideMaximize
} from "lucide-react";
import type { MouseEvent } from "react";
import NewTagButton from "./NewTagButton";
import S from "./style/TagSelector.style";
import useTagSelector from "./useTagSelector";

const Button = Buttons.Action.Alternative;

export default function TagSelector({
	modalId,
	fullSize,
	maximum,
	showNewTagButton,
	tags,
	title
}: TagSelectorProps) {
	const t = useTagSelector({ maximum, tags });
	const f = useTagSelectorFilter();

	// NOTE: tagTreeModalId has to depend on `modalId` because we can have
	// multiple TagSelectors on the same page.
	const tagTreeModalId = `${modalIds.tagTree.tagSelector}-${modalId}` as ModalId;
	const { openModal } = useModalState();

	function onModalOpen(e: MouseEvent) {
		e.stopPropagation();
		openModal(tagTreeModalId);
	}

	return (
		<>
			<S.Wrapper $fullSize={fullSize}>
				{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
				{!!title && (
					<S.Title {...(maximum && { title: `Choose at most ${maximum} tag(s)` })}>
						{title}
					</S.Title>
				)}

				<div style={{ position: "relative" }}>
					<S.Actions>
						{!f.expanded && (
							<>
								<Filter
									filter={t.filter}
									updateFilter={t.updateFilter}
									clearFilter={t.clearFilter}
									onFocus={f.expandFilter}
								/>
								{/* TODO: we show this exact thing in two different places -- make it a subcomponent, or at least a render function */}
								{!!t.selectedTagIds.length && (
									<Button onClick={t.onSelectionReset}>
										<LucideFilterX size={20} color="orangered" />
									</Button>
								)}
								{showNewTagButton && <NewTagButton modalId={modalId} />}

								<Button onClick={f.expandFilter}>
									<LucideChevronDown size={20} color={"darkorchid"} />
								</Button>
							</>
						)}
					</S.Actions>

					{!t.selectedTags.length ? (
						<S.EmptySelection>You haven't selected any tags yet.</S.EmptySelection>
					) : (
						<Selection tags={t.tags} selectedTags={t.selectedTags} />
					)}

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
									<Button onClick={t.onSelectionReset}>
										<LucideFilterX size={20} color="orangered" />
									</Button>
								)}

								<Button onClick={onModalOpen}>
									<LucideMaximize size={20} color="dodgerblue" />
								</Button>

								{showNewTagButton && <NewTagButton modalId={modalId} />}

								<Button onClick={f.minimizeFilter}>
									<LucideChevronUp size={20} color={"forestgreen"} />
								</Button>
							</S.DropdownActions>

							<S.List>
								<TagSelectorItems
									modalId={modalId}
									tags={t.tagsToDisplay}
									tagSelection={t.tagSelection}
									updateTagSelection={t.updateTagSelection}
								/>
							</S.List>

							<Selection fullPaths tags={t.tags} selectedTags={t.selectedTags} />
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

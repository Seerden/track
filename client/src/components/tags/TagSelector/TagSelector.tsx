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

export default function TagSelector(p: TagSelectorProps) {
	const t = useTagSelector({ maximum: p.maximum, tagsById: p.tagsById });
	const f = useTagSelectorFilter();

	// NOTE: tagTreeModalId has to depend on `modalId` because we can have
	// multiple TagSelectors on the same page.
	const tagTreeModalId = `${modalIds.tagTree.tagSelector}-${p.modalId}` as ModalId;
	const { openModal } = useModalState();

	function onModalOpen(e: MouseEvent) {
		e.stopPropagation();
		openModal(tagTreeModalId);
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
								{/* TODO: we show this exact thing in two different places -- make it a subcomponent, or at least a render function */}
								{!!t.selectedTagIds.length && (
									<Buttons.Action.Alternative onClick={t.onSelectionReset}>
										<LucideFilterX size={20} color="orangered" />
									</Buttons.Action.Alternative>
								)}
								{p.showNewTagButton && <NewTagButton modalId={p.modalId} />}

								<Buttons.Action.Alternative onClick={f.expandFilter}>
									<LucideChevronDown size={20} color={"darkorchid"} />
								</Buttons.Action.Alternative>
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
									<Buttons.Action.Alternative onClick={t.onSelectionReset}>
										<LucideFilterX size={20} color="orangered" />
									</Buttons.Action.Alternative>
								)}

								<Buttons.Action.Alternative onClick={onModalOpen}>
									<LucideMaximize size={20} color={"dodgerblue"} />
								</Buttons.Action.Alternative>

								{p.showNewTagButton && <NewTagButton modalId={p.modalId} />}

								<Buttons.Action.Alternative onClick={f.minimizeFilter}>
									<LucideChevronUp size={20} color={"forestgreen"} />
								</Buttons.Action.Alternative>
							</S.DropdownActions>

							<S.List>
								<TagSelectorItems
									modalId={p.modalId}
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

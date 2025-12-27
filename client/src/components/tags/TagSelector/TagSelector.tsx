import Form from "@lib/theme/components/form.style";
import type { TagsInTree } from "@shared/lib/schemas/tag";
import {
	LucideChevronDown,
	LucideChevronUp,
	LucideFilterX,
	LucideMaximize,
} from "lucide-react";
import { AnimatePresence, stagger } from "motion/react";
import { Filter } from "@/components/tags/TagSelector/Filter";
import { Selection } from "@/components/tags/TagSelector/Selection";
import { TagSelectorItems } from "@/components/tags/TagSelector/TagSelectorItems";
import TagTree from "@/components/tags/TagTree/TagTree";
import type { ModalId } from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import NewTagButton from "./NewTagButton";
import S, { tagSelectorMotionVariants } from "./style/TagSelector.style";
import useTagSelector from "./useTagSelector";

const Button = Buttons.Action.Alternative;

type TagSelectorProps = {
	/** id for tag selection state */
	tagSelectorId: string;
	title?: string;
	tags?: TagsInTree;
	fullSize?: boolean;
	maximum?: number;
	showNewTagButton?: boolean;
	/** The modalId that gets passed to `NewTagButton` */
	modalId: ModalId;
};

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
		filter,
		selectedTagIds,
		selectedTags,
		tagSelection,
		tags: selectorTags,
		filteredTags,
		tagSelectorRef,
		expanded,
		dropdownRef,
		tagTreeModalId,
		clearFilter,
		handleSelectionReset,
		updateFilter,
		updateTagSelection,
		handleDropdownBlur,
		expandFilter,
		handleModalOpen,
		minimizeFilter,
	} = useTagSelector({ maximum, tags, id: tagSelectorId, modalId });

	return (
		<>
			<S.Wrapper
				$fullSize={fullSize}
				ref={tagSelectorRef}
				onBlur={handleDropdownBlur}
			>
				{/* TODO: the info tooltip should be in a little info block, not a title on a random element */}
				{!!title && (
					<Form.RowTitle
						{...(maximum && { title: `Choose at most ${maximum} tag(s)` })}
					>
						{title}
					</Form.RowTitle>
				)}

				<Containers.Column
					style={{
						position: "relative",
						marginTop: "0.3rem",
						flex: 1,
						justifyContent: "space-between",
					}}
				>
					<S.Actions>
						<Filter
							disabled={expanded}
							filter={filter}
							updateFilter={updateFilter}
							clearFilter={clearFilter}
							onFocus={expandFilter}
						/>
						{!expanded && (
							<>
								{/* TODO: we show this exact thing in two different places -- make it a subcomponent, or at least a render function */}
								{!!selectedTagIds.length && (
									<Button onClick={handleSelectionReset}>
										<LucideFilterX size={18} color="orangered" />
									</Button>
								)}
								{showNewTagButton && <NewTagButton modalId={modalId} />}

								<Button onClick={expandFilter}>
									<LucideChevronDown size={20} color={"darkorchid"} />
								</Button>
							</>
						)}
					</S.Actions>

					<Selection tags={selectorTags} selectedTags={selectedTags} />

					<AnimatePresence>
						{expanded && (
							<S.DropdownContent
								ref={dropdownRef}
								variants={tagSelectorMotionVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{
									duration: 0.25,
									ease: "easeOut",
									delayChildren: stagger(0.1),
								}}
							>
								<AnimatePresence>
									<S.DropdownActions>
										<Filter
											filter={filter}
											clearFilter={clearFilter}
											updateFilter={updateFilter}
											hasAutoFocus
										/>

										{!!selectedTagIds.length && (
											<Button onClick={handleSelectionReset}>
												<LucideFilterX size={18} color="orangered" />
											</Button>
										)}

										<Button onClick={handleModalOpen}>
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
											// TODO (TRK-209) updateTagSelection is exported from
											// the state hook, so we could just call the hook
											// inside here, instead of prop-drilling it. Only
											// difference is we'd have to manually pass
											// `maximum`.
											updateTagSelection={updateTagSelection}
										/>
									</S.List>

									<Selection
										fullPaths
										tags={selectorTags}
										selectedTags={selectedTags}
									/>
								</AnimatePresence>
							</S.DropdownContent>
						)}
					</AnimatePresence>
				</Containers.Column>
			</S.Wrapper>
			{/* NOTE I don't think we need to conditionally render TagTree based on !!state.isOpen, 
            but if the modal ever acts weird, that's the first thing to try for a fix. */}
			<TagTree modalId={tagTreeModalId} />
		</>
	);
}

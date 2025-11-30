import { Select, TextInput, Tooltip } from "@mantine/core";
import { LucideBlend, LucideFilterX, LucideNetwork } from "lucide-react";
import {
	ClearInputButton,
	ResetButton,
} from "@/components/activities/ActivityFilter/ActivityFilter";
import type { TagFilter } from "@/components/activities/ActivityFilter/tag-filter.atom";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import ActivityFilter from "../../activities/ActivityFilter/style/ActivityFilter.style";
import S from "./style/TagFilter.style";
import { useTagFilter } from "./useTagFilter";

export default function FilterTags() {
	const {
		actions,
		tagFilter,
		filteredTags,
		noTagsFound,
		wholeTree,
		isSelectedTag,
		isActiveTag,
	} = useTagFilter();

	return (
		<ActivityFilter.Section
			style={{
				width: 300,
				fontSize: font.size["0.9"],
			}}
		>
			{/* TODO (TRK-296): this should only be here when inside the ActivityFilter, 
               otherwise it'll be inline with the  rest of the action buttons. */}
			{false && <ResetButton onClick={actions.reset.value} />}
			<ActivityFilter.SectionContent>
				<ActivityFilter.SectionActionBar
					style={{
						width: 300,
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<div>
							<Select
								tabIndex={0}
								checkIconPosition="right"
								comboboxProps={{ withinPortal: false }}
								data={[
									{
										value: "includes",
										label: "Include tags",
									},
									{
										value: "excludes",
										label: "Exclude tags",
									},
								]}
								value={tagFilter.type}
								onChange={(value) => {
									if (!value) return;
									actions.set.type(value as TagFilter["type"]);
								}}
								styles={{
									input: {
										width: "18ch",
										paddingBlock: "0rem",
									},
								}}
							/>
						</div>
						<div
							style={{
								height: "max-content",
								alignItems: "center",
								alignSelf: "center",
								display: "flex",
								justifyContent: "flex-end",
								width: "100%",
								gap: spacingValue.small,
							}}
						>
							{/* TODO: this should not be here when rendered inside ActivityFilter */}
							{true && (
								<Tooltip label="Clear filter">
									<ActivityFilter.Toggle
										type="button"
										onClick={actions.reset.value}
										$active={false}
									>
										<LucideFilterX size={18} />
									</ActivityFilter.Toggle>
								</Tooltip>
							)}
							<Tooltip label="Match tag list exactly?">
								<ActivityFilter.Toggle
									role="checkbox"
									onClick={actions.set.toggleExact}
									$active={tagFilter.exact}
								>
									<LucideBlend size={18} />
								</ActivityFilter.Toggle>
							</Tooltip>

							<Tooltip label="Select whole tag tree at once?">
								<ActivityFilter.Toggle
									role="checkbox"
									onClick={actions.set.toggleWholeTree}
									$active={wholeTree}
								>
									<LucideNetwork size={18} />
								</ActivityFilter.Toggle>
							</Tooltip>
						</div>
					</div>

					<TextInput
						rightSection={
							<>
								{tagFilter.search.length > 0 && (
									<ClearInputButton onClick={actions.reset.search} />
								)}
							</>
						}
						type="text"
						value={tagFilter.search}
						onChange={actions.set.search}
						style={{ width: "100%", position: "relative" }}
					/>
				</ActivityFilter.SectionActionBar>
				<S.TagSelectionList>
					{filteredTags?.map(({ tag_id, name }) => {
						return (
							<ActivityFilter.TagChip
								key={tag_id}
								$selected={isSelectedTag(tag_id)}
								$active={isActiveTag(tag_id)}
								onMouseEnter={() =>
									actions.set.updateActiveTagIds(tag_id, "on")
								}
								onMouseLeave={() =>
									actions.set.updateActiveTagIds(tag_id, "off")
								}
								value={tag_id}
								onClick={actions.set.tags}
							>
								{name}
							</ActivityFilter.TagChip>
						);
					})}

					{noTagsFound && <p>No tags found that match the search query.</p>}
				</S.TagSelectionList>
			</ActivityFilter.SectionContent>
		</ActivityFilter.Section>
	);
}

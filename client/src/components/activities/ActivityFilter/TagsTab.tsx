import { FocusTrap, Select, TextInput, Tooltip } from "@mantine/core";
import { LucideBlend, LucideFilterX, LucideNetwork } from "lucide-react";
import {
	ClearInputButton,
	ResetButton,
} from "@/components/activities/ActivityFilter/ActivityFilter";
import type { TagFilter } from "@/components/activities/ActivityFilter/tag-filter.atom";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/ActivityFilter.style";
import { useTagFilter } from "./useTagFilter";

export default function TagsTab() {
	const {
		resetTagsValue,
		tagFilter,
		setTagFilterType,
		setTagSearch,
		resetTagSearch,
		filteredTags,
		noTagsFound,
		toggleExact,
		toggleWholeTree,
		wholeTree,
		isSelectedTag,
		isActiveTag,
		updateActiveTagIds,
		setFilterTags,
	} = useTagFilter();

	return (
		<FocusTrap>
			<S.Section
				style={{
					width: 300,
					fontSize: font.size["0.9"],
				}}
			>
				{/* TODO: this should only be here when inside the ActivityFilter, 
               otherwise it'll be inline with the  rest of the action buttons. */}
				{false && <ResetButton onClick={resetTagsValue} />}
				<S.SectionContent>
					<S.SectionActionBar
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
										setTagFilterType(value as TagFilter["type"]);
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
										<S.Toggle
											role="button"
											onClick={resetTagsValue}
											$active={false}
										>
											<LucideFilterX size={18} />
										</S.Toggle>
									</Tooltip>
								)}
								<Tooltip label="Match tag list exactly?">
									<S.Toggle
										role="checkbox"
										onClick={toggleExact}
										$active={tagFilter.exact}
									>
										<LucideBlend size={18} />
									</S.Toggle>
								</Tooltip>

								<Tooltip label="Select whole tag tree at once?">
									<S.Toggle
										role="checkbox"
										onClick={toggleWholeTree}
										$active={wholeTree}
									>
										<LucideNetwork size={18} />
									</S.Toggle>
								</Tooltip>
							</div>
						</div>

						<TextInput
							rightSection={
								<>
									{tagFilter.search.length > 0 && (
										<ClearInputButton onClick={resetTagSearch} />
									)}
								</>
							}
							type="text"
							value={tagFilter.search}
							onChange={setTagSearch}
							style={{ width: "100%", position: "relative" }}
						/>
					</S.SectionActionBar>
					<S.TagSelectionList>
						{filteredTags?.map(({ tag_id, name }) => {
							return (
								<S.TagChip
									$selected={isSelectedTag(tag_id)}
									$active={isActiveTag(tag_id)}
									onMouseEnter={() => updateActiveTagIds(tag_id, "on")}
									onMouseLeave={() => updateActiveTagIds(tag_id, "off")}
									key={tag_id}
									value={tag_id}
									onClick={setFilterTags}
								>
									{name}
								</S.TagChip>
							);
						})}

						{noTagsFound && <p>No tags found that match the search query.</p>}
					</S.TagSelectionList>
				</S.SectionContent>
			</S.Section>
		</FocusTrap>
	);
}

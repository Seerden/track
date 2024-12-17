import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { nameTypeOptions } from "@/components/activities/ActivityFilter/filter-name";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import { DateTimePicker } from "@mantine/dates";
import { LucideBlend, LucideFilterX, LucideNetwork, LucideXCircle } from "lucide-react";
import { useState } from "react";
import S from "./style/ActivityFilter.style";

export type ActivityFilterProps = {
	onChange: (filter: ActivityFilterWithValues) => void;
};

export default function ActivityFilter({ onChange }: ActivityFilterProps) {
	const {
		isProbablySuspended,
		filter,
		actions,
		tagSearch,
		setTagSearch,
		noTagsFound,
		tags,
		getTagBackgroundColor,
		wholeTree,
		toggleWholeTree,
		toggleExact
	} = useActivityFilter({ onChange });

	const [activeTab, setActiveTab] = useState("name");

	if (isProbablySuspended) return null;

	return (
		<S.Wrapper>
			<S.TabsHeader>
				{["name", "tags", "datetime"].map((tab) => {
					const isActive = activeTab === tab;

					return (
						<S.Tab
							role="tab"
							onClick={() => setActiveTab(tab)}
							key={tab}
							$active={isActive}
						>
							<S.TabInner $active={isActive}>{tab}</S.TabInner>
						</S.Tab>
					);
				})}
			</S.TabsHeader>

			<S.TabsPanel role="tabpanel">
				{activeTab === "name" && (
					<S.Section>
						<ResetButton onClick={actions.reset.name.all} />
						<div style={{ display: "flex", flexDirection: "row" }}>
							<S.InputWithSelect style={{ position: "relative" }}>
								<S.Select onChange={actions.set.name.type}>
									{nameTypeOptions.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</S.Select>
								<S.Input
									type="text"
									onChange={actions.set.name.value}
									value={filter.name.value ?? ""}
								/>
								{(filter.name.value || "").length > 0 && (
									<FilterClear onClick={actions.reset.name.value} />
								)}
							</S.InputWithSelect>
						</div>
					</S.Section>
				)}
				{activeTab === "tags" && (
					<S.Section>
						<ResetButton onClick={actions.reset.tags} />
						<S.SectionContent>
							<S.SectionActionBar>
								<S.InputWithSelect style={{ position: "relative" }}>
									<S.Select onChange={actions.set.tags.type}>
										{/* TODO: get these values from a constant */}
										{["includes", "excludes"].map((type) => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</S.Select>
									<S.Input
										type="text"
										value={tagSearch}
										onChange={(e) => setTagSearch(e.target.value)}
									/>
									{tagSearch.length > 0 && (
										<FilterClear onClick={() => setTagSearch("")} />
									)}
								</S.InputWithSelect>
								<S.Toggle
									role="button"
									onClick={toggleExact}
									$active={filter.tags.exact}
									title="Exact match?"
								>
									<LucideBlend size={15} />
								</S.Toggle>
								<S.Toggle
									role="button"
									onClick={toggleWholeTree}
									$active={wholeTree}
									title="Select tree?"
								>
									<LucideNetwork size={15} />
								</S.Toggle>
							</S.SectionActionBar>
							<S.TagSelectionList>
								{tags.map((tag) => {
									// TODO: instead of a function `getTagBackgroundColor`,
									// passing the relevant state to this button and setting the
									// styles in the styled component would be better.
									const backgroundColor = getTagBackgroundColor(tag.tag_id);
									const color = ["orange", "darkorange"].includes(
										backgroundColor
									)
										? "white"
										: "black";

									return (
										<S.TagChip
											style={{
												backgroundColor,
												color
											}}
											onMouseEnter={() =>
												actions.set.activeTagIds(tag.tag_id, "on")
											}
											onMouseLeave={() =>
												actions.set.activeTagIds(tag.tag_id, "off")
											}
											key={tag.tag_id}
											value={tag.tag_id}
											onClick={actions.set.tags.value}
										>
											{tag.name}
										</S.TagChip>
									);
								})}

								{noTagsFound && <p>No tags found that match the search query.</p>}
							</S.TagSelectionList>
						</S.SectionContent>
					</S.Section>
				)}
				{activeTab === "datetime" && (
					<S.Section>
						<ResetButton onClick={actions.reset.datetime} />
						<S.DatetimeSectionContent>
							{/* Modifier radio inputs */}
							<S.DatetimeSectionColumn>
								{["starts", "ends", "occurs"].map((modifier) => (
									<S.Label
										key={modifier}
										$active={filter.datetime.modifier === modifier}
									>
										{modifier}
										<input
											style={{ width: 0 }}
											name="datetime.modifier"
											type="radio"
											onChange={() => actions.set.datetime.modifier(modifier)}
										/>
									</S.Label>
								))}
							</S.DatetimeSectionColumn>
							<S.DatetimeSectionColumn>
								{["before", "after", "between"].map((selector) => (
									<S.Label
										key={selector}
										$active={filter.datetime.selector === selector}
									>
										{selector}
										<input
											style={{ width: 0 }}
											name="datetime.modifier"
											type="radio"
											onChange={() => actions.set.datetime.selector(selector)}
										/>
									</S.Label>
								))}
							</S.DatetimeSectionColumn>
							<S.DatetimeSectionColumn>
								<DateTimePicker
									size="sm"
									label={
										filter.datetime.selector === "between"
											? "start"
											: "datetime"
									}
									value={filter.datetime.value?.[0]?.toDate()}
									defaultValue={new Date()}
									onChange={(value) => actions.set.datetime.value(value, 0)}
								/>
								{filter.datetime.selector === "between" && (
									<>
										<DateTimePicker
											label="end"
											size="sm"
											value={filter.datetime.value?.[1]?.toDate()}
											defaultValue={new Date()}
											onChange={(e) => actions.set.datetime.value(e, 1)}
										/>
									</>
								)}
							</S.DatetimeSectionColumn>
						</S.DatetimeSectionContent>
					</S.Section>
				)}
			</S.TabsPanel>
		</S.Wrapper>
	);
}

function ResetButton({ onClick }: { onClick: () => void }) {
	return (
		<S.ResetButton onClick={onClick}>
			<LucideFilterX size={20} />
		</S.ResetButton>
	);
}

function FilterClear({ onClick }: { onClick: () => void }) {
	return (
		<LucideXCircle
			size={20}
			color="white"
			fill="royalblue"
			style={{
				position: "absolute",
				right: "0.2rem",
				top: "50%",
				transform: "translateY(-50%)",
				cursor: "pointer"
			}}
			onClick={onClick}
		/>
	);
}

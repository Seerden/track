import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { activityFilterTabs } from "@/components/activities/ActivityFilter/lib/constants";
import { nameTypeOptions } from "@/components/activities/ActivityFilter/lib/filter-name";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import { DateTimePicker } from "@mantine/dates";
import { LucideBlend, LucideFilterX, LucideNetwork, LucideXCircle } from "lucide-react";
import S from "./style/ActivityFilter.style";

export type ActivityFilterProps = {
	onChange: (filter: ActivityFilterWithValues) => void;
};

export default function ActivityFilter({ onChange }: ActivityFilterProps) {
	const {
		isProbablySuspended,
		filter,
		actions,
		noTagsFound,
		tags,
		isActiveTag,
		isSelectedTag,
		wholeTree,
		toggleWholeTree,
		activeTab,
		setActiveTab
	} = useActivityFilter({ onChange });

	if (isProbablySuspended) return null;

	return (
		<S.Wrapper>
			<S.TabsHeader>
				{activityFilterTabs.map((tab) => {
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
									<ClearInputButton onClick={actions.reset.name.value} />
								)}
							</S.InputWithSelect>
						</div>
					</S.Section>
				)}
				{activeTab === "tags" && (
					<S.Section>
						<ResetButton onClick={actions.reset.tags.value} />
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
										value={filter.tags.search}
										onChange={actions.set.tags.search}
									/>
									{filter.tags.search.length > 0 && (
										<ClearInputButton onClick={actions.reset.tags.search} />
									)}
								</S.InputWithSelect>
								<S.Toggle
									role="button"
									onClick={actions.set.tags.toggleExact}
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
								{tags.map(({ tag_id, name }) => {
									return (
										<S.TagChip
											$selected={isSelectedTag(tag_id)}
											$active={isActiveTag(tag_id)}
											onMouseEnter={() =>
												actions.set.activeTagIds(tag_id, "on")
											}
											onMouseLeave={() =>
												actions.set.activeTagIds(tag_id, "off")
											}
											key={tag_id}
											value={tag_id}
											onClick={actions.set.tags.value}
										>
											{name}
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
									placeholder={`pick a ${filter.datetime.selector === "between" ? "start" : ""} date`}
									label={
										filter.datetime.selector === "between"
											? "start"
											: "datetime"
									}
									value={filter.datetime.value?.[0]?.toDate()}
									onChange={(value) => actions.set.datetime.value(value, 0)}
									style={{
										width: "150px"
									}}
									maxDate={filter.datetime.value?.[1]?.toDate()}
								/>
								{filter.datetime.selector === "between" && (
									<>
										<DateTimePicker
											label="end"
											placeholder="pick an end date"
											size="sm"
											value={filter.datetime.value?.[1]?.toDate()}
											onChange={(e) => actions.set.datetime.value(e, 1)}
											minDate={filter.datetime.value?.[0]?.toDate()}
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

function ClearInputButton({ onClick }: { onClick: () => void }) {
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

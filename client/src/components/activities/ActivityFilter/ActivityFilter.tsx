import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import { DateTimePicker } from "@mantine/dates";
import { produce } from "immer";
import { LucideBlend, LucideFilterX, LucideNetwork, LucideXCircle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import S from "./style/ActivityFilter.style";

export type ActivityFilterProps = {
	onChange: (filter: ActivityFilterWithValues) => void;
};

export default function ActivityFilter({ onChange }: ActivityFilterProps) {
	const {
		isProbablySuspended,
		filter,
		setFilterNameType,
		setFilterNameValue,
		resetFilterName,
		resetTagsFilter,
		setFilter,
		tagSearch,
		setTagSearch,
		noTagsFound,
		tags,
		getTagBackgroundColor,
		updateActiveTagIds,
		setFilterTags,
		setDatetimeFilterModifier,
		setDatetimeFilterSelector,
		setDatetimeFilterValue,
		resetNameFilter,
		resetDatetimeFilter,
		wholeTree,
		setWholeTree
	} = useActivityFilter({ onChange });

	const [activeTab, setActiveTab] = useState("name");

	const renderTabs = ["name", "tags", "datetime"].map((tab) => {
		return (
			<S.Tab
				role="tab"
				onClick={() => setActiveTab(tab)}
				key={tab}
				$active={activeTab === tab}
			>
				<S.TabInner $active={activeTab === tab}>{tab}</S.TabInner>
			</S.Tab>
		);
	});

	if (isProbablySuspended) return null;

	return (
		<S.Wrapper>
			<S.TabsHeader>{renderTabs}</S.TabsHeader>

			<S.TabsPanel role="tabpanel">
				{activeTab === "name" && (
					<NameFilterContent
						filter={filter}
						setFilterNameType={setFilterNameType}
						setFilterNameValue={setFilterNameValue}
						resetFilterName={resetFilterName}
						resetNameFilter={resetNameFilter}
					/>
				)}
				{activeTab === "tags" && (
					<TagsFilterContent
						resetTagsFilter={resetTagsFilter}
						setFilter={setFilter}
						tagSearch={tagSearch}
						setTagSearch={setTagSearch}
						noTagsFound={noTagsFound}
						tags={tags}
						getTagBackgroundColor={getTagBackgroundColor}
						updateActiveTagIds={updateActiveTagIds}
						setFilterTags={setFilterTags}
						filter={filter}
						wholeTree={wholeTree}
						setWholeTree={setWholeTree}
					/>
				)}
				{activeTab === "datetime" && (
					<DatetimeFilterContent
						setDatetimeFilterModifier={setDatetimeFilterModifier}
						setDatetimeFilterSelector={setDatetimeFilterSelector}
						filter={filter}
						setDatetimeFilterValue={setDatetimeFilterValue}
						resetDatetimeFilter={resetDatetimeFilter}
					/>
				)}
			</S.TabsPanel>
		</S.Wrapper>
	);
}

type NameFilterContentProps = {
	setFilterNameType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	setFilterNameValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetFilterName: () => void;
	filter: ActivityFilterWithValues;
	resetNameFilter: () => void;
};

function NameFilterContent({
	setFilterNameType,
	setFilterNameValue,
	resetFilterName,
	filter,
	resetNameFilter
}: NameFilterContentProps) {
	return (
		<S.Section>
			<ResetButton onClick={resetNameFilter} />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<S.InputWithSelect style={{ position: "relative" }}>
					<S.Select
						onChange={
							setFilterNameType /* TODO: this should be named setFilterType */
						}
					>
						<option value="includes">includes</option>
						<option value="equals">equals</option>
						<option value="excludes">excludes</option>
						<option value="startsWith">starts with</option>
						<option value="endsWith">ends with</option>
					</S.Select>
					<S.Input
						type="text"
						onChange={setFilterNameValue}
						value={filter.name.value ?? ""}
					/>
					{(filter.name.value?.length ?? 0) > 0 && (
						<FilterClear onClick={resetFilterName} />
					)}
				</S.InputWithSelect>
			</div>
		</S.Section>
	);
}

type TagsFilterContentProps = {
	resetTagsFilter: () => void;
	setFilter: (
		fn: (current: ActivityFilterWithValues) => ActivityFilterWithValues
	) => void;
	tagSearch: string;
	setTagSearch: (value: string) => void;
	noTagsFound: boolean;
	tags: { tag_id: number; name: string }[];
	getTagBackgroundColor: (tagId: number) => string;
	updateActiveTagIds: (tagId: number, action: "on" | "off") => void;
	setFilterTags: (e: React.MouseEvent<HTMLButtonElement>) => void;
	filter: ActivityFilterWithValues;
	wholeTree: boolean;
	setWholeTree: Dispatch<SetStateAction<boolean>>;
};

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

function TagsFilterContent({
	resetTagsFilter,
	setFilter,
	tagSearch,
	setTagSearch,
	noTagsFound,
	tags,
	getTagBackgroundColor,
	updateActiveTagIds,
	setFilterTags,
	filter,
	wholeTree,
	setWholeTree
}: TagsFilterContentProps) {
	function toggleExact() {
		setFilter(
			produce((draft) => {
				draft.tags.exact = !draft.tags.exact;
			})
		);
	}

	function toggleWholeTree() {
		setWholeTree((current) => !current);
	}

	const exact = filter.tags.exact;

	return (
		<S.Section>
			<ResetButton onClick={resetTagsFilter} />
			<S.SectionContent>
				<S.SectionActionBar>
					<S.InputWithSelect style={{ position: "relative" }}>
						<S.Select
							onChange={(e) => {
								setFilter((current) => ({
									...current,
									tags: {
										...current.tags,
										type: e.target
											.value as ActivityFilterWithValues["tags"]["type"]
									}
								}));
							}}
						>
							<option value="includes">includes</option>
							<option value="excludes">excludes</option>
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
						$active={exact}
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
				<div
					style={{
						marginTop: "0.5rem",
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "0.5rem",
						maxWidth: "327px" // TODO: I just hardcoded this to match the 'action bar' for now, but this should be responsive
					}}
				>
					{tags.map((tag) => (
						<button
							style={{
								// TODO most of this is temporary
								backgroundColor: getTagBackgroundColor(tag.tag_id),
								color: ["orange", "darkorange"].includes(
									getTagBackgroundColor(tag.tag_id)
								)
									? "white"
									: "black",
								outline: "1px solid #ccc",
								border: "none",
								padding: "0.3rem",
								borderRadius: "3px",
								cursor: "pointer",
								flex: 1
							}}
							onMouseEnter={() => updateActiveTagIds(tag.tag_id, "on")}
							onMouseLeave={() => updateActiveTagIds(tag.tag_id, "off")}
							key={tag.tag_id}
							value={tag.tag_id}
							onClick={setFilterTags}
						>
							{tag.name}
						</button>
					))}

					{noTagsFound && <p>No tags found that match the search query.</p>}
				</div>
			</S.SectionContent>
		</S.Section>
	);
}

type DateTimeFilterContentProps = {
	setDatetimeFilterModifier: (modifier: string) => void;
	setDatetimeFilterSelector: (selector: string) => void;
	filter: ActivityFilterWithValues;
	setDatetimeFilterValue: (value: Date | null, index: number) => void;
	resetDatetimeFilter: () => void;
};

function DatetimeFilterContent({
	setDatetimeFilterModifier,
	setDatetimeFilterSelector,
	filter,
	setDatetimeFilterValue,
	resetDatetimeFilter
}: DateTimeFilterContentProps) {
	return (
		<S.Section>
			<ResetButton onClick={resetDatetimeFilter} />
			<S.DatetimeSectionContent>
				{/* Modifier radio inputs */}
				<S.DatetimeSectionColumn>
					{["starts", "ends", "occurs"].map((modifier) => (
						<S.Label key={modifier} $active={filter.datetime.modifier === modifier}>
							{modifier}
							<input
								style={{ width: 0 }}
								name="datetime.modifier"
								type="radio"
								onChange={() => setDatetimeFilterModifier(modifier)}
							/>
						</S.Label>
					))}
				</S.DatetimeSectionColumn>
				<S.DatetimeSectionColumn>
					{["before", "after", "between"].map((selector) => (
						<S.Label key={selector} $active={filter.datetime.selector === selector}>
							{selector}
							<input
								style={{ width: 0 }}
								name="datetime.modifier"
								type="radio"
								onChange={() => setDatetimeFilterSelector(selector)}
							/>
						</S.Label>
					))}
				</S.DatetimeSectionColumn>
				<S.DatetimeSectionColumn>
					<DateTimePicker
						size="sm"
						label={filter.datetime.selector === "between" ? "start" : "datetime"}
						value={filter.datetime.value?.[0]?.toDate()}
						defaultValue={new Date()}
						onChange={(value) => setDatetimeFilterValue(value, 0)}
					/>
					{filter.datetime.selector === "between" && (
						<>
							<DateTimePicker
								label="end"
								size="sm"
								value={filter.datetime.value?.[1]?.toDate()}
								defaultValue={new Date()}
								onChange={(e) => setDatetimeFilterValue(e, 1)}
							/>
						</>
					)}
				</S.DatetimeSectionColumn>
			</S.DatetimeSectionContent>
		</S.Section>
	);
}

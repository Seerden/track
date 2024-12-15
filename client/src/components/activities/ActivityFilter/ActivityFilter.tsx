import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import { produce } from "immer";
import { LucideFilterX, LucideXCircle } from "lucide-react";
import { useState } from "react";
import S from "./style/ActivityFilter.style";

export type ActivityFilterProps = {
	onChange: (filter: ActivityFilterWithValues) => void;
};

export default function ActivityFilter({ onChange }: ActivityFilterProps) {
	const {
		isProbablySuspended,
		filter,
		setFilterName,
		resetFilterTags,
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
		setDatetimeFilterValue
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
				{activeTab === "name" && <NameFilterContent setFilterName={setFilterName} />}
				{activeTab === "tags" && (
					<TagsFilterContent
						resetFilterTags={resetFilterTags}
						setFilter={setFilter}
						tagSearch={tagSearch}
						setTagSearch={setTagSearch}
						noTagsFound={noTagsFound}
						tags={tags}
						getTagBackgroundColor={getTagBackgroundColor}
						updateActiveTagIds={updateActiveTagIds}
						setFilterTags={setFilterTags}
						filter={filter}
					/>
				)}
				{activeTab === "datetime" && (
					<DatetimeFilterContent
						setDatetimeFilterModifier={setDatetimeFilterModifier}
						setDatetimeFilterSelector={setDatetimeFilterSelector}
						filter={filter}
						setDatetimeFilterValue={setDatetimeFilterValue}
					/>
				)}
			</S.TabsPanel>
		</S.Wrapper>
	);
}

type NameFilterContentProps = {
	setFilterName: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function NameFilterContent({ setFilterName }: NameFilterContentProps) {
	return (
		<S.Section>
			<S.SectionName>
				name
				<button type="reset">
					<LucideFilterX size={15} />
				</button>
			</S.SectionName>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<select onChange={setFilterName}>
					<option value="includes">includes</option>
					<option value="equals">equals</option>
					<option value="excludes">excludes</option>
					<option value="startsWith">starts with</option>
					<option value="endsWith">ends with</option>
				</select>
				<input type="text" />
			</div>
		</S.Section>
	);
}

type TagsFilterContentProps = {
	resetFilterTags: () => void;
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
};

function TagsFilterContent({
	resetFilterTags,
	setFilter,
	tagSearch,
	setTagSearch,
	noTagsFound,
	tags,
	getTagBackgroundColor,
	updateActiveTagIds,
	setFilterTags,
	filter
}: TagsFilterContentProps) {
	function toggleExact() {
		setFilter(
			produce((draft) => {
				draft.tags.exact = !draft.tags.exact;
			})
		);
	}

	const exact = filter.tags.exact;

	return (
		<S.Section>
			<S.SectionName>
				tags{" "}
				<button type="reset" onClick={resetFilterTags}>
					<LucideFilterX size={15} />
				</button>
			</S.SectionName>
			<S.SectionContent>
				<S.SectionActionBar>
					<S.Toggle role="button" onClick={toggleExact} $active={exact}>
						exact?
					</S.Toggle>

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
							<option value="include">include</option>
							<option value="exclude">exclude</option>
						</S.Select>
						<S.Input
							type="text"
							value={tagSearch}
							onChange={(e) => setTagSearch(e.target.value)}
						/>
						{tagSearch.length > 0 && (
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
								onClick={() => setTagSearch("")}
							/>
						)}
					</S.InputWithSelect>
				</S.SectionActionBar>
				<div
					style={{
						marginTop: "0.5rem",
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "0.5rem"
					}}
				>
					{tags.map((tag) => (
						<button
							style={{
								backgroundColor: getTagBackgroundColor(tag.tag_id),
								outline: "1px solid #ccc",
								border: "none",
								padding: "0.3rem",
								borderRadius: "3px",
								cursor: "pointer"
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
	setDatetimeFilterSelector: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	filter: ActivityFilterWithValues;
	setDatetimeFilterValue: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
};

function DatetimeFilterContent({
	setDatetimeFilterModifier,
	setDatetimeFilterSelector,
	filter,
	setDatetimeFilterValue
}: DateTimeFilterContentProps) {
	return (
		<S.Section>
			<S.SectionName>
				datetime{" "}
				<button type="reset">
					<LucideFilterX size={15} />
				</button>
			</S.SectionName>
			<div
				style={{
					display: "flex",
					flexDirection: "row"
				}}
			>
				{/* Modifier radio inputs */}
				<div
					style={{
						display: "flex",
						flexDirection: "column"
					}}
				>
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
				</div>
				<div>
					<select onChange={setDatetimeFilterSelector}>
						<option value="before">before</option>
						<option value="after">after</option>
						<option value="between">between</option>
					</select>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column"
					}}
				>
					<input
						type="datetime-local"
						value={filter.datetime.value?.[0]?.format("YYYY-MM-DDTHH:mm")}
						onChange={(e) => setDatetimeFilterValue(e, 0)}
					/>
					{filter.datetime.selector === "between" && (
						<>
							and{" "}
							<input
								value={filter.datetime.value?.[1]?.format("YYYY-MM-DDTHH:mm")}
								type="datetime-local"
								onChange={(e) => setDatetimeFilterValue(e, 1)}
							/>
						</>
					)}
				</div>
			</div>
		</S.Section>
	);
}

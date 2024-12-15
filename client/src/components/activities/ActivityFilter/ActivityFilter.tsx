import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import { DateTimePicker } from "@mantine/dates";
import { AnimatePresence } from "framer-motion";
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
		<S.Wrapper
			layout
			initial={{
				minWidth: "0px",
				height: "max-content"
			}}
			animate={{
				minWidth: "max-content",
				height: "max-content"
			}}
		>
			<S.TabsHeader layout>{renderTabs}</S.TabsHeader>

			<S.TabsPanel role="tabpanel">
				{activeTab === "name" && (
					<AnimatePresence mode="wait" presenceAffectsLayout>
						<NameFilterContent setFilterName={setFilterName} />
					</AnimatePresence>
				)}
				{activeTab === "tags" && (
					<AnimatePresence mode="wait" presenceAffectsLayout>
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
					</AnimatePresence>
				)}
				{activeTab === "datetime" && (
					<AnimatePresence mode="wait" key="c" presenceAffectsLayout>
						<DatetimeFilterContent
							setDatetimeFilterModifier={setDatetimeFilterModifier}
							setDatetimeFilterSelector={setDatetimeFilterSelector}
							filter={filter}
							setDatetimeFilterValue={setDatetimeFilterValue}
						/>
					</AnimatePresence>
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
		<S.Section layout>
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
		<S.Section layout>
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
						gap: "0.5rem",
						maxWidth: "400px"
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
};

function DatetimeFilterContent({
	setDatetimeFilterModifier,
	setDatetimeFilterSelector,
	filter,
	setDatetimeFilterValue
}: DateTimeFilterContentProps) {
	return (
		<S.Section layout>
			<S.SectionName>
				datetime{" "}
				<button type="reset">
					<LucideFilterX size={15} />
				</button>
			</S.SectionName>
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

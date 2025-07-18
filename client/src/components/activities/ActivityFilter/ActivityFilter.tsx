import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import {
	activityFilterDatetimeModifiers,
	activityFilterDatetimeSelectors,
	activityFilterTabs,
	activityFilterTagsTypes
} from "@/components/activities/ActivityFilter/lib/constants";
import { nameTypeOptions } from "@/components/activities/ActivityFilter/lib/filter-name";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import Containers from "@/lib/theme/components/container.style";
import Input from "@/lib/theme/input";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { DateTimePicker } from "@mantine/dates";
import { LucideBlend, LucideFilterX, LucideNetwork, LucideXCircle } from "lucide-react";
import type { ReactNode } from "react";
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

	const tabMap: Record<typeof activeTab, ReactNode> = {
		name: <NameTab filter={filter} actions={actions} />,
		tags: (
			<TagsTab
				actions={actions}
				filter={filter}
				toggleWholeTree={toggleWholeTree}
				wholeTree={wholeTree}
				tags={tags}
				isSelectedTag={isSelectedTag}
				isActiveTag={isActiveTag}
				noTagsFound={noTagsFound}
			/>
		),
		datetime: <DatetimeTab filter={filter} actions={actions} />
	};

	return (
		<S.Wrapper>
			<S.TabsHeader>
				{activityFilterTabs.map((tab) => (
					<S.Tab
						key={tab}
						role="tab"
						onClick={() => setActiveTab(tab)}
						$active={activeTab === tab}
					>
						<S.TabInner $active={activeTab === tab}>{tab}</S.TabInner>
					</S.Tab>
				))}
			</S.TabsHeader>

			<S.TabsPanel role="tabpanel">{tabMap[activeTab]}</S.TabsPanel>
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

type Defined<T> = T extends undefined ? never : T;

type TabProps = {
	filter: ActivityFilterWithValues;
	actions: Defined<ReturnType<typeof useActivityFilter>["actions"]>;
};

function DatetimeTab({ filter, actions }: TabProps) {
	return (
		<S.Section>
			<ResetButton onClick={actions.reset.datetime} />
			<Containers.Row gap="small" style={{ marginTop: spacingValue.small }}>
				<Containers.Column>
					{activityFilterDatetimeModifiers.map((modifier) => (
						<S.Label key={modifier} $active={filter.datetime.modifier === modifier}>
							{modifier}
							<Input.Hidden
								name="datetime.modifier"
								type="radio"
								onChange={() => actions.set.datetime.modifier(modifier)}
							/>
						</S.Label>
					))}
				</Containers.Column>
				<Containers.Column>
					{activityFilterDatetimeSelectors.map((selector) => (
						<S.Label key={selector} $active={filter.datetime.selector === selector}>
							{selector}
							<input
								style={{ width: 0 }}
								name="datetime.modifier"
								type="radio"
								onChange={() => actions.set.datetime.selector(selector)}
							/>
						</S.Label>
					))}
				</Containers.Column>
				<Containers.Column>
					<DateTimePicker
						size="sm"
						placeholder={`pick a ${filter.datetime.selector === "between" ? "start" : ""} date`}
						label={filter.datetime.selector === "between" ? "start" : "datetime"}
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
				</Containers.Column>
			</Containers.Row>
		</S.Section>
	);
}

// TODO: split actions up into feature, not by action type. Then we only have to
// pass actions.name into this subcomponent. Same goes for the others.
function NameTab({ filter, actions }: TabProps) {
	return (
		<S.Section>
			<ResetButton onClick={actions.reset.name.all} />
			<Containers.Row>
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
			</Containers.Row>
		</S.Section>
	);
}

function TagsTab({
	actions,
	filter,
	toggleWholeTree,
	wholeTree,
	tags,
	isSelectedTag,
	isActiveTag,
	noTagsFound
}: {
	actions: Defined<ReturnType<typeof useActivityFilter>["actions"]>;
	filter: ActivityFilterWithValues;
	toggleWholeTree: () => void;
	wholeTree: boolean;
	tags: { tag_id: string; name: string }[];
	isSelectedTag: (tagId: string) => boolean | undefined;
	isActiveTag: (tagId: string) => boolean;
	noTagsFound: boolean;
}) {
	return (
		<S.Section>
			<ResetButton onClick={actions.reset.tags.value} />
			<S.SectionContent>
				<S.SectionActionBar>
					<S.InputWithSelect style={{ position: "relative" }}>
						<S.Select onChange={actions.set.tags.type}>
							{activityFilterTagsTypes.map((type) => (
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
								onMouseEnter={() => actions.set.activeTagIds(tag_id, "on")}
								onMouseLeave={() => actions.set.activeTagIds(tag_id, "off")}
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
	);
}

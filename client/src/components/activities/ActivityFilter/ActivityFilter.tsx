import { useTheme } from "@emotion/react";
import { DateTimePicker } from "@mantine/dates";
import { LucideFilterX, LucideX } from "lucide-react";
import type { ReactNode } from "react";
import type { ActivityFilterState } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import {
	activityFilterTabs,
	datetimeFilterModifiers,
	datetimeFilterSelectors,
} from "@/components/activities/ActivityFilter/lib/constants";
import { nameTypeOptions } from "@/components/activities/ActivityFilter/lib/filter-name";
import FilterTags from "@/components/activities/ActivityFilter/TagFilter";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Input from "@/lib/theme/input";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import S from "./style/ActivityFilter.style";

export type ActivityFilterProps = {
	onChange: (filter: ActivityFilterState) => void;
};

export default function ActivityFilter({ onChange }: ActivityFilterProps) {
	const { isProbablySuspended, filter, actions, activeTab, setActiveTab } =
		useActivityFilter({ onChange });

	if (isProbablySuspended) return null;

	const tabMap: Record<typeof activeTab, ReactNode> & { tags: ReactNode } = {
		name: <NameTab filter={filter} actions={actions} />,
		tags: <FilterTags />,
		datetime: <DatetimeTab filter={filter} actions={actions} />,
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

export function ResetButton({ onClick }: { onClick: () => void }) {
	return (
		<S.ResetButton onClick={onClick}>
			<LucideFilterX size={20} />
		</S.ResetButton>
	);
}

export function ClearInputButton({ onClick }: { onClick: () => void }) {
	const theme = useTheme() as MainTheme;
	return (
		<Buttons.Unstyled
			type="button"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "absolute",
				right: "0.5rem",
				top: "50%",
				transform: "translateY(-50%)",
				cursor: "pointer",
				height: "max-content",
				width: "max-content",
			}}
			onClick={onClick}
		>
			<LucideX size={20} color={theme.colors.text.main[0]} />
		</Buttons.Unstyled>
	);
}

export type Defined<T> = T extends undefined ? never : T;

type TabProps = {
	filter: ActivityFilterState;
	actions: Defined<ReturnType<typeof useActivityFilter>["actions"]>;
};

function DatetimeTab({ filter, actions }: TabProps) {
	return (
		<S.Section>
			<ResetButton onClick={actions.reset.datetime} />
			<Containers.Row gap="small" style={{ marginTop: spacingValue.small }}>
				<Containers.Column>
					{datetimeFilterModifiers.map((modifier) => (
						<S.Label
							key={modifier}
							$active={filter.datetime.modifier === modifier}
						>
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
					{datetimeFilterSelectors.map((selector) => (
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
				</Containers.Column>
				<Containers.Column>
					<DateTimePicker
						size="sm"
						placeholder={`pick a ${filter.datetime.selector === "between" ? "start" : ""} date`}
						label={
							filter.datetime.selector === "between" ? "start" : "datetime"
						}
						value={filter.datetime.value?.[0]?.toDate()}
						onChange={(value) => actions.set.datetime.value(value, 0)}
						style={{
							width: "150px",
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

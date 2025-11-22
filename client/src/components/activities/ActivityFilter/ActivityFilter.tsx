import { useTheme } from "@emotion/react";
import type { Defined } from "@shared/types/data/utility.types";
import { LucideFilterX, LucideX } from "lucide-react";
import type { ReactNode } from "react";
import type { ActivityFilterState } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import DatetimeTab from "@/components/activities/ActivityFilter/DatetimeTab";
import { activityFilterTabs } from "@/components/activities/ActivityFilter/lib/constants";
import NameTab from "@/components/activities/ActivityFilter/NameTab";
import useActivityFilter from "@/components/activities/ActivityFilter/useActivityFilter";
import type { Actions } from "@/components/activities/ActivityFilter/useActivityFilterActions";
import FilterTags from "@/components/tags/TagFilter/TagFilter";
import type { MainTheme } from "@/lib/style/theme";
import Buttons from "@/lib/theme/components/buttons";
import S from "./style/ActivityFilter.style";

export type ActivityFilterProps = {
	onChange: (filter: ActivityFilterState) => void;
};

export default function ActivityFilter({ onChange }: ActivityFilterProps) {
	const { isProbablySuspended, filter, actions, activeTab, setActiveTab } =
		useActivityFilter({ onChange });

	if (isProbablySuspended) return null;

	const tabMap = {
		name: <NameTab filter={filter} actions={actions.name} />,
		tags: <FilterTags />,
		datetime: <DatetimeTab filter={filter} actions={actions.datetime} />,
	} satisfies Record<typeof activeTab, ReactNode>;

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

export type TabProps<T extends keyof Actions> = {
	filter: ActivityFilterState;
	actions: Defined<Actions[T]>;
};

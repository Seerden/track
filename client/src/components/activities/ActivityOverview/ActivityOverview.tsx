import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { filterActivities } from "@/components/activities/ActivityFilter/lib/filter";
import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import { filterTagsById } from "@/lib/filter-tags";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Table from "@/lib/theme/components/table";
import {
	LucideArrowDownWideNarrow,
	LucideDownload,
	LucideFilter,
	LucideSquareDot
} from "lucide-react";
import { useMemo, useState } from "react";
import S from "./style/ActivityOverview.style";

export default function ActivityOverview() {
	const { isProbablySuspended, activities, tags } = useActivityOverview();
	const float = useFloatingProps({ click: {} });
	const [filter, setFilter] = useState<ActivityFilterWithValues>();

	const filteredActivities = useMemo(() => {
		if (!activities || !filter) return [];

		return filterActivities({ activities, filter });
	}, [activities, filter]);

	if (isProbablySuspended) return null;

	return (
		<S.OverviewWrapper>
			{/* TODO: should this be floating? */}
			<Containers.ActionBar>
				<Buttons.Action.Alternative
					light
					ref={float.refs.setReference}
					{...float.getReferenceProps()}
					title="Filter"
				>
					<LucideFilter size={15} />
				</Buttons.Action.Alternative>

				{/* TODO: once implemented, set `light` to true */}
				<Buttons.Action.Alternative disabled title="Sort (not yet implemented)">
					<LucideArrowDownWideNarrow size={15} />
				</Buttons.Action.Alternative>

				<Buttons.Action.Alternative disabled title="Export (not yet implemented)">
					<LucideDownload size={15} />
				</Buttons.Action.Alternative>

				<Buttons.Action.Alternative disabled title="Select (not yet implemented)">
					<LucideSquareDot size={15} />
				</Buttons.Action.Alternative>
			</Containers.ActionBar>

			<S.FloatingWrapper
				ref={float.refs.setFloating}
				style={{
					...float.floatingStyles,
					display: float.open ? "block" : "none"
				}}
				{...float.getFloatingProps()}
			>
				<ActivityFilter onChange={setFilter} />
			</S.FloatingWrapper>

			<S.Wrapper>
				<Table.Header.Dark.Wrapper>
					{/* TODO: these should come from a constant list. We should 
                     also use that list (and a mapper) in TableItem, so that the 
                     two are always in sync. */}
					<Table.Header.Dark.Field>Task completed?</Table.Header.Dark.Field>
					<Table.Header.Dark.Field>Name</Table.Header.Dark.Field>
					<Table.Header.Dark.Field>Start</Table.Header.Dark.Field>
					<Table.Header.Dark.Field>End</Table.Header.Dark.Field>
					<Table.Header.Dark.Field>Tags</Table.Header.Dark.Field>
					<Table.Header.Dark.Field>Creation date</Table.Header.Dark.Field>
				</Table.Header.Dark.Wrapper>
				{filteredActivities.map((activity) => (
					<TableItem
						key={activity.activity_id}
						activity={activity}
						tags={filterTagsById(activity.tag_ids, tags)}
					/>
				))}
			</S.Wrapper>
		</S.OverviewWrapper>
	);
}

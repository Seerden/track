import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { filterActivities } from "@/components/activities/ActivityFilter/lib/filter";
import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import { filterTagsById } from "@/lib/filter-tags";
import useFloatingProps from "@/lib/hooks/useFloatingProps";
import {
	LucideArrowDownWideNarrow,
	LucideDownload,
	LucideFilter,
	LucideSquareDot
} from "lucide-react";
import { useMemo, useState } from "react";
import S from "./style/ActivityOverview.style";

export default function ActivityOverview() {
	const { isProbablySuspended, activities, tagsData } = useActivityOverview();
	const float = useFloatingProps({ click: {} });
	const [filter, setFilter] = useState<ActivityFilterWithValues>();

	const filteredActivities = useMemo(() => {
		if (!activities || !filter) return [];

		return filterActivities({ activities, filter });
	}, [activities, filter]);

	if (isProbablySuspended) return null;

	return (
		<S.OverviewWrapper>
			<S.ActionBar>
				<S.ActionButton
					ref={float.refs.setReference}
					{...float.getReferenceProps()}
					title="Filter"
				>
					<LucideFilter size={15} />
				</S.ActionButton>

				<S.ActionButton disabled title="Sort (not yet implemented)">
					<LucideArrowDownWideNarrow size={15} />
				</S.ActionButton>

				<S.ActionButton disabled title="Export (not yet implemented)">
					<LucideDownload size={15} />
				</S.ActionButton>

				<S.ActionButton disabled title="Select (not yet implemented)">
					<LucideSquareDot size={15} />
				</S.ActionButton>
			</S.ActionBar>

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
				<S.Header>
					{/* TODO: these should come from a constant list. We should 
                     also use that list (and a mapper) in TableItem, so that the 
                     two are always in sync. */}
					<S.HeaderField>Task completed?</S.HeaderField>
					<S.HeaderField>Name</S.HeaderField>
					<S.HeaderField>Start</S.HeaderField>
					<S.HeaderField>End</S.HeaderField>
					<S.HeaderField>Tags</S.HeaderField>
					<S.HeaderField>Creation date</S.HeaderField>
				</S.Header>
				{filteredActivities.map((activity) => (
					<TableItem
						key={activity.activity_id}
						activity={activity}
						tags={filterTagsById(activity.tag_ids, tagsData.byId)}
					/>
				))}
			</S.Wrapper>
		</S.OverviewWrapper>
	);
}

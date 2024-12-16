import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { filterActivities } from "@/components/activities/ActivityFilter/filter";
import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import useActivityOverviewFilter from "@/components/activities/ActivityOverview/useActivityOverviewFilter";
import { filterTagsById } from "@/lib/filter-tags";
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
	const float = useActivityOverviewFilter();
	const [filter, setFilter] = useState<ActivityFilterWithValues>();

	const filteredActivities = useMemo(() => {
		if (!activities || !filter) return [];

		return filterActivities({ activities, filter });
	}, [activities, filter]);

	if (isProbablySuspended) return null;

	return (
		<S.OverviewWrapper>
			<S.ActionBar>
				{/* Filter */}
				<S.ActionButton ref={float.refs.setReference} {...float.getReferenceProps()}>
					<LucideFilter size={15} />
				</S.ActionButton>

				{/* Sort */}
				<S.ActionButton disabled>
					<LucideArrowDownWideNarrow size={15} />
				</S.ActionButton>

				{/* Export */}
				<S.ActionButton disabled>
					<LucideDownload size={15} />
				</S.ActionButton>

				{/* Toggle selection */}
				<S.ActionButton disabled>
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
				<ActivityFilter onChange={setFilter /* TODO: WIP! */} />
			</S.FloatingWrapper>

			<S.Wrapper>
				{/* TODO: don't use a table. these things suck to style. 
            just use a grid. much more customizable */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "max-content 250px repeat(4, 150px)"
					}}
				>
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
							tags={filterTagsById(activity.tag_ids, tags)}
						/>
					))}
				</div>
			</S.Wrapper>
		</S.OverviewWrapper>
	);
}

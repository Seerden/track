import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import type { ActivityFilterWithValues } from "@/components/activities/ActivityFilter/ActivityFilter.types";
import { filterActivities } from "@/components/activities/ActivityFilter/filter";
import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import useActivityOverviewFilter from "@/components/activities/ActivityOverview/useActivityOverviewFilter";
import { filterTagsById } from "@/lib/filter-tags";
import { Action } from "@/lib/theme/components/buttons";
import { LucideFilter } from "lucide-react";
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
			<div>
				<Action.Alternative
					ref={float.refs.setReference}
					{...float.getReferenceProps()}
					style={{
						backgroundColor: "white",
						justifySelf: "flex-start",
						position: "sticky",
						zIndex: 2,
						top: 0
					}}
				>
					<LucideFilter size={15} />
				</Action.Alternative>

				<div
					ref={float.refs.setFloating}
					style={{
						marginTop: "1rem",
						zIndex: 2,
						padding: "1rem",
						borderRadius: "12px",
						outline: "2px solid white",
						border: "2px solid royalblue",
						marginLeft: "0.5rem",
						boxShadow: "0 0 1rem -0.2rem royalblue",
						backgroundColor: "white",
						...float.floatingStyles,
						display: float.open ? "block" : "none"
					}}
					{...float.getFloatingProps()}
				>
					<ActivityFilter onChange={setFilter /* TODO: WIP! */} />
				</div>

				<S.Wrapper>
					{/* TODO: don't use a table. these things suck to style. 
            just use a grid. much more customizable */}
					<div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(6, max-content)"
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
					</div>
				</S.Wrapper>
			</div>
		</S.OverviewWrapper>
	);
}

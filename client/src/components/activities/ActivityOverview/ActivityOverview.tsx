import ActivityFilter from "@/components/activities/ActivityFilter/ActivityFilter";
import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import useActivityOverviewFilter from "@/components/activities/ActivityOverview/useActivityOverviewFilter";
import { filterTagsById } from "@/lib/filter-tags";
import { Action } from "@/lib/theme/components/buttons";
import { LucideFilter } from "lucide-react";
import { useState } from "react";
import S from "./style/ActivityOverview.style";

export default function ActivityOverview() {
	const { isProbablySuspended, activities, tags } = useActivityOverview();
	const float = useActivityOverviewFilter();
	const [filter, setFilter] = useState({});

	if (isProbablySuspended) return null;

	return (
		<>
			<Action.Alternative
				ref={float.refs.setReference}
				{...float.getReferenceProps()}
				style={{
					justifySelf: "flex-end",
					position: "sticky",
					top: 0
				}}
			>
				<LucideFilter size={15} />
			</Action.Alternative>
			{float.open && (
				<div
					ref={float.refs.setFloating}
					style={{
						marginTop: "1rem",
						zIndex: 2,
						padding: "1rem",
						borderRadius: "12px",
						// outline: "2px solid white",
						// border: "2px solid royalblue",
						marginLeft: "0.5rem",
						// boxShadow: "0 0 1rem -0.2rem royalblue",
						// backgroundColor: "white",
						...float.floatingStyles
					}}
					{...float.getFloatingProps()}
				>
					<ActivityFilter onChange={setFilter /* TODO: WIP! */} />
				</div>
			)}
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
						{activities.map((activity) => (
							<TableItem
								key={activity.activity_id}
								activity={activity}
								tags={filterTagsById(activity.tag_ids, tags)}
							/>
						))}
					</div>
				</div>
			</S.Wrapper>
		</>
	);
}

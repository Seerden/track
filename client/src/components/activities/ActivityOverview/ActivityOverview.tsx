import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import { filterTagsById } from "@/lib/filter-tags";
import S from "./style/ActivityOverview.style";

export default function ActivityOverview() {
	const { isProbablySuspended, activities, tags } = useActivityOverview();

	if (isProbablySuspended) return null;

	return (
		<S.Wrapper>
			{/* TODO: don't use a table. these things suck to style. 
            just use a grid. much more customizable */}
			<div>
				<div></div>
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
	);
}

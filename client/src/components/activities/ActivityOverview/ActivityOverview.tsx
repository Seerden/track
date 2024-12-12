import TableItem from "@/components/activities/ActivityOverview/TableItem";
import useActivityOverview from "@/components/activities/ActivityOverview/useActivityOverview";
import { filterTagsById } from "@/lib/filter-tags";
import S from "./style/ActivityOverview.style";

export default function ActivityOverview() {
	const { isProbablySuspended, activities, tags } = useActivityOverview();

	if (isProbablySuspended) return null;

	return (
		<S.Wrapper>
			<S.Table>
				<S.TableHeader>
					<tr>
						{/* TODO: these should come from a constant list. We should 
                     also use that list (and a mapper) in TableItem, so that the 
                     two are always in sync. */}
						<th>Name</th>
						<th>Start</th>
						<th>End</th>
					</tr>
				</S.TableHeader>
				{activities.map((activity) => (
					<TableItem
						key={activity.activity_id}
						activity={activity}
						tags={filterTagsById(activity.tag_ids, tags)}
					/>
				))}
			</S.Table>
		</S.Wrapper>
	);
}

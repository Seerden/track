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
			<S.Table>
				<S.TableHeader>
					<tr>
						{/* TODO: these should come from a constant list. We should 
                     also use that list (and a mapper) in TableItem, so that the 
                     two are always in sync. */}
						<S.TableHeaderField>Task completed?</S.TableHeaderField>
						<S.TableHeaderField>Name</S.TableHeaderField>
						<S.TableHeaderField>Start</S.TableHeaderField>
						<S.TableHeaderField>End</S.TableHeaderField>
						<S.TableHeaderField>Tags</S.TableHeaderField>
						<S.TableHeaderField>Creation date</S.TableHeaderField>
					</tr>
				</S.TableHeader>
				<tbody style={{ backgroundColor: "red" }}>
					{activities.map((activity) => (
						<TableItem
							key={activity.activity_id}
							activity={activity}
							tags={filterTagsById(activity.tag_ids, tags)}
						/>
					))}
				</tbody>
			</S.Table>
		</S.Wrapper>
	);
}

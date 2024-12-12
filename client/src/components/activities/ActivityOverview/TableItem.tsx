import { activityEnd, activityStart } from "@/lib/activity";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { TagWithIds } from "@t/data/tag.types";
import S from "./style/TableItem.style";

type TableItemProps = {
	activity: ActivityWithIds;
	tags: TagWithIds[];
};

export default function TableItem({ activity, tags }: TableItemProps) {
	const start = activityStart(activity);
	const end = activityEnd(activity);

	return (
		<S.TableItem>
			<td>{activity.name}</td>
			<td>{start.fromNow()}</td>
			<td>{end.fromNow()}</td>
			<td>
				{tags.map((tag) => (
					<span key={tag.tag_id}>{tag.name}</span>
				))}
			</td>
		</S.TableItem>
	);
}

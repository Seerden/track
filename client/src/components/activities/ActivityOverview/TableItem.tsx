import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { activityEnd, activityStart } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { TagWithIds } from "@t/data/tag.types";
import S from "./style/TableItem.style";

type TableItemProps = {
	activity: ActivityWithIds;
	tags: TagWithIds[];
};

export default function TableItem({ activity, tags }: TableItemProps) {
	const putCompletion = usePutTaskCompletion(activity);

	const start = activityStart(activity);
	const end = activityEnd(activity);
	const createdAt = createDate(activity.created_at);
	const isTask = activity.is_task ?? false;

	return (
		// TODO: $isTask doesn't do anything yet.
		<S.TableItem $isTask={isTask}>
			<td>
				{isTask ? (
					<label>
						<Checkbox checked={activity.completed} onChange={putCompletion} />
					</label>
				) : null}
			</td>
			<td>{activity.name}</td>
			<td>{start.fromNow()}</td>
			<td>{end.fromNow()}</td>
			<td>
				{tags.map((tag) => (
					<span key={tag.tag_id}>{tag.name}</span>
				))}
			</td>
			<td>{createdAt.fromNow()}</td>
		</S.TableItem>
	);
}

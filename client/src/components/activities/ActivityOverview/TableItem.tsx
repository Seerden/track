import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { activityEnd, activityStart } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import S from "./style/TableItem.style";

type TableItemProps = {
	activity: ActivityWithIds;
	tags: TagWithIds[];
};

export default function TableItem({ activity, tags }: TableItemProps) {
	const putCompletion = usePutTaskCompletion(activity);

	const start = activityStart(activity).fromNow();
	const end = activityEnd(activity).fromNow();
	const createdAt = createDate(activity.created_at).fromNow();
	const isTask = activity.is_task ?? false;

	// TODO: $isTask doesn't do anything yet.
	return (
		<S.Item $isTask={isTask}>
			<S.Column
				style={{
					justifyContent: "center"
				}}
			>
				{isTask ? (
					<label>
						<Checkbox
							checked={activity.completed ?? false}
							onChange={putCompletion}
						/>
					</label>
				) : null}
			</S.Column>
			<S.Column>{activity.name}</S.Column>
			<S.Column>{start}</S.Column>
			<S.Column>{end}</S.Column>
			<S.Column>
				{tags.map((tag) => (
					<span key={tag.tag_id}>{tag.name}</span>
				))}
			</S.Column>
			<S.Column>{createdAt}</S.Column>
		</S.Item>
	);
}

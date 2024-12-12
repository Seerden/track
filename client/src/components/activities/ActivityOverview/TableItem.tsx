import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { activityEnd, activityStart } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import type { ActivityWithIds } from "@t/data/activity.types";
import type { TagWithIds } from "@t/data/tag.types";
import type { PropsWithChildren } from "react";
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
			<Column>
				{isTask ? (
					<label>
						<Checkbox checked={activity.completed} onChange={putCompletion} />
					</label>
				) : null}
			</Column>
			<Column>{activity.name}</Column>
			<Column>{start.fromNow()}</Column>
			<Column>{end.fromNow()}</Column>
			<Column>
				{tags.map((tag) => (
					<span key={tag.tag_id}>{tag.name}</span>
				))}
			</Column>
			<Column>{createdAt.fromNow()}</Column>
		</S.TableItem>
	);
}

function Column({ children }: PropsWithChildren) {
	return (
		<S.Column>
			<span>{children}</span>
		</S.Column>
	);
}

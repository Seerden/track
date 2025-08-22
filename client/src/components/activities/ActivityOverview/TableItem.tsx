import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { activityEnd, activityStart } from "@/lib/activity";
import { createDate } from "@/lib/datetime/make-date";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import Table from "@/lib/theme/components/table";
import S from "./style/TableItem.style";

type TableItemProps = {
	activity: ActivityWithIds;
	tags: TagWithIds[];
};

/** Subcomponent for ActivityOverview. */
export default function TableItem({ activity, tags }: TableItemProps) {
	const putCompletion = usePutTaskCompletion(activity);
	const start = activityStart(activity).fromNow();
	const end = activityEnd(activity).fromNow();
	const createdAt = createDate(activity.created_at).fromNow();
	const isTask = activity.is_task ?? false;

	// TODO: $isTask doesn't do anything yet.
	return (
		<S.Item $isTask={isTask}>
			<Table.Cell centered>
				{isTask && (
					<label>
						<Checkbox
							checked={activity.completed ?? false}
							onChange={putCompletion}
						/>
					</label>
				)}
			</Table.Cell>
			<Table.Cell>{activity.name}</Table.Cell>
			<Table.Cell>{start}</Table.Cell>
			<Table.Cell>{end}</Table.Cell>
			<Table.Cell>
				{tags.map((tag) => (
					<span key={tag.tag_id}>{tag.name}</span>
				))}
			</Table.Cell>
			<Table.Cell>{createdAt}</Table.Cell>
		</S.Item>
	);
}

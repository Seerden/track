import { useTask } from "@/components/Today/useTask";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import { formatToHHmm } from "@/lib/datetime/format-date";
import { activityEnd, activityStart } from "@lib/activity";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import type { TagWithIds } from "@shared/lib/schemas/tag";
import TagCard from "../tags/TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TaskProps = {
	activity: PossiblySyntheticActivity;
	tags?: TagWithIds[];
};

export default function Task({ activity, tags = [] }: TaskProps) {
	const { handleModalOpen, putCompletion } = useTask(activity);

	return (
		<T.Task $completed={activity.completed ?? false} onClick={handleModalOpen}>
			<S.CheckboxWrapper
				onClick={(e) => {
					// This prevents the task from being opened when the checkbox is
					// clicked.
					e.stopPropagation();
				}}
			>
				<Checkbox checked={activity.completed ?? false} onChange={putCompletion} />
			</S.CheckboxWrapper>
			<T.Times>
				<span>from {formatToHHmm(activityStart(activity))}</span>
				<span>to {formatToHHmm(activityEnd(activity))}</span>
			</T.Times>
			<T.TaskName>{activity.name}</T.TaskName>
			{!!tags.length && (
				// TODO: make sure the styling of the component doesn't do anything
				// weird when Tags isn't rendered
				<S.Tags>
					{tags.map((tag) => (
						<TagCard key={tag.tag_id} tag={tag} />
					))}
				</S.Tags>
			)}
		</T.Task>
	);
}

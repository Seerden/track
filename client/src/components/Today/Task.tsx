import useTask from "@/components/Today/hooks/use-task";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import TagCard from "../TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

type TaskProps = {
	activity: ActivityWithIds;
	tagsById?: ById<TagWithIds>;
};

export default function Task({ activity, tagsById }: TaskProps) {
	const { checkboxRef, maybeOpenTaskModal, putCompletion, tags } = useTask({
		activity,
		tagsById
	});

	return (
		<T.Task onClick={maybeOpenTaskModal}>
			<S.CheckboxWrapper ref={checkboxRef}>
				<S.Checkbox
					type="checkbox"
					style={{ display: "none" }}
					checked={activity.completed}
					onChange={putCompletion}
				/>
				<Checkbox checked={activity.completed} />
			</S.CheckboxWrapper>
			<T.Times>
				<span>from {activityStart(activity).format("HH:mm")}</span>
				<span>to {activityEnd(activity).format("HH:mm")}</span>
			</T.Times>
			<T.TaskName>{activity.name}</T.TaskName>
			<S.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</S.Tags>
		</T.Task>
	);
}

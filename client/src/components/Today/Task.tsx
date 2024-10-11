import useTaskCompletionMutation from "@/lib/query/use-task-mutation";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import { filterTagsById } from "@lib/filter-tags";
import { ActivityWithIds } from "@type/server/activity.types";
import { TagWithIds } from "@type/server/tag.types";
import { ById } from "@type/server/utility.types";
import TagCard from "../TagCard/TagCard";
import * as S from "./Today.style";

type TaskProps = {
	activity: ActivityWithIds;
	tagsById?: ById<TagWithIds>;
};

export default function Task({ activity, tagsById }: TaskProps) {
	const tags = filterTagsById(activity.tag_ids, tagsById); // TODO: pass this as a prop and, in Tasks, get it from a hook

	const { mutate } = useTaskCompletionMutation();
	function putCompletion() {
		mutate({ ...activity, completed: !activity.completed });
	}

	return (
		<S.Task>
			<S.CheckboxWrapper>
				<S.Checkbox
					type="checkbox"
					style={{ display: "none" }}
					checked={activity.completed}
					onChange={putCompletion}
				/>
				<Checkbox checked={activity.completed} />
			</S.CheckboxWrapper>
			<S.TaskName>{activity.name}</S.TaskName>
			<S.Times>
				{activityStart(activity).format("HH:mm")}
				{" - "}
				{activityEnd(activity).format("HH:mm")}
			</S.Times>
			<S.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</S.Tags>
		</S.Task>
	);
}

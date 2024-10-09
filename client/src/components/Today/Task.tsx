import { activityEnd, activityStart } from "../../lib/activity";
import { filterTagsById } from "../../lib/filter-tags";
import { ActivityWithIds } from "../../types/server/activity.types";
import { TagWithIds } from "../../types/server/tag.types";
import { ById } from "../../types/server/utility.types";
import TagCard from "../TagCard/TagCard";
import * as S from "./Today.style";

type TaskProps = {
	activity: ActivityWithIds;
	tagsById?: ById<TagWithIds>;
};

export default function Task({ activity, tagsById }: TaskProps) {
	const tags = filterTagsById(activity.tag_ids, tagsById); // TODO: pass this as a prop and, in Tasks, get it from a hook

	return (
		<S.Task>
			<S.Checkbox type="checkbox" checked={activity.completed} />
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

import modalIds from "@/lib/modal-ids";
import useTaskCompletionMutation from "@/lib/query/use-task-mutation";
import { useModalState } from "@/lib/state/modal-state";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import { filterTagsById } from "@lib/filter-tags";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById } from "@type/server/utility.types";
import { useCallback, useRef } from "react";
import TagCard from "../TagCard/TagCard";
import T from "./Tasks.style";
import S from "./Today.style";

type TaskProps = {
	activity: ActivityWithIds;
	tagsById?: ById<TagWithIds>;
};

export default function Task({ activity, tagsById }: TaskProps) {
	const tags = filterTagsById(activity.tag_ids, tagsById); // TODO: pass this as a prop and, in Tasks, get it from a hook
	const checkboxRef = useRef<HTMLLabelElement>(null);

	const { mutate } = useTaskCompletionMutation();
	function putCompletion() {
		mutate({ ...activity, completed: !activity.completed });
	}

	const { setModalState } = useModalState(modalIds.detailedActivity);

	const maybeOpenTaskModal = useCallback(
		(e: React.MouseEvent) => {
			if (checkboxRef.current?.contains(e.target as Node)) return;

			setModalState(() => ({
				isOpen: true,
				itemId: activity.activity_id,
				itemType: "activity"
			}));
			e.stopPropagation();
		},
		[checkboxRef, activity]
	);

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
			<T.Tags>
				{tags.map((tag) => (
					<TagCard key={tag.tag_id} tag={tag} />
				))}
			</T.Tags>
		</T.Task>
	);
}

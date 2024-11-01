import { useDetailedActivityModal } from "@/components/Today/hooks/use-detailed-activity-modal";
import { filterTagsById } from "@/lib/filter-tags";
import usePutTaskCompletion from "@/lib/hooks/use-put-task-completion";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { TagWithIds } from "@type/server/tag.types";
import type { ById, ID } from "@type/server/utility.types";
import { useCallback, useRef } from "react";
import TagCard from "../TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

function useTask({
	activity,
	tagsById
}: {
	activity: ActivityWithIds;
	tagsById?: Record<ID, TagWithIds>;
}) {
	const tags = filterTagsById(activity.tag_ids, tagsById); // TODO: pass this as a prop and, in Tasks, get it from a hook
	const checkboxRef = useRef<HTMLLabelElement>(null);

	const putCompletion = usePutTaskCompletion(activity);

	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });
	const maybeOpenTaskModal = useCallback(
		(e: React.MouseEvent) => {
			if (checkboxRef.current?.contains(e.target as Node)) return;

			openDetailedActivityModal();
			e.stopPropagation();
		},
		[checkboxRef, activity]
	);

	return {
		checkboxRef,
		maybeOpenTaskModal,
		putCompletion,
		tags
	} as const;
}

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
		// TODO: instead of maybeOpenTaskModal and putCompletion in onChange, I
		// think we can do openTaskModal if we put the putCompletion on the
		// CheckboxWrapper (onClick) instead of in Checkbox onChange
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

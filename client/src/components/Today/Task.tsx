import { useDetailedActivityModal } from "@/components/Today/hooks/use-detailed-activity-modal";
import usePutTaskCompletion from "@/lib/hooks/use-put-task-completion";
import { Checkbox } from "@/lib/theme/components/Checkbox";
import { activityEnd, activityStart } from "@lib/activity";
import type { ActivityWithIds } from "@type/server/activity.types";
import type { TagWithIds } from "@type/server/tag.types";
import { useCallback, useRef } from "react";
import TagCard from "../TagCard/TagCard";
import T from "./style/Tasks.style";
import S from "./style/Today.style";

function useTask({ activity }: { activity: ActivityWithIds }) {
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
		putCompletion
	} as const;
}

type TaskProps = {
	activity: ActivityWithIds;
	tags?: TagWithIds[];
};

export default function Task({ activity, tags = [] }: TaskProps) {
	const { checkboxRef, maybeOpenTaskModal, putCompletion } = useTask({
		activity
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

import { filterTagsById } from "@/lib/filter-tags";
import modalIds from "@/lib/modal-ids";
import useTaskCompletionMutation from "@/lib/query/use-task-mutation";
import { useModalState } from "@/lib/state/modal-state";
import type { ActivityWithIds } from "@/types/server/activity.types";
import type { TagWithIds } from "@/types/server/tag.types";
import type { ID } from "@/types/server/utility.types";
import { useCallback, useRef } from "react";

export default function useTask({
	activity,
	tagsById,
}: {
	activity: ActivityWithIds;
	tagsById?: Record<ID, TagWithIds>;
}) {
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
				itemType: "activity",
			}));
			e.stopPropagation();
		},
		[checkboxRef, activity],
	);

	return {
		checkboxRef,
		maybeOpenTaskModal,
		putCompletion,
		tags,
	} as const;
}

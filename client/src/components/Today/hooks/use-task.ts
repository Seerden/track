import { useDetailedActivityModal } from "@/components/Today/hooks/use-detailed-activity-modal";
import { filterTagsById } from "@/lib/filter-tags";
import usePutTaskCompletion from "@/lib/hooks/use-put-task-completion";
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

	const putCompletion = usePutTaskCompletion(activity);

	const { openDetailedActivityModal } = useDetailedActivityModal({ activity });
	const maybeOpenTaskModal = useCallback(
		(e: React.MouseEvent) => {
			if (checkboxRef.current?.contains(e.target as Node)) return;

			openDetailedActivityModal();
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

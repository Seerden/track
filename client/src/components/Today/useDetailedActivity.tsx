import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { useMutation } from "@tanstack/react-query";
import type { MouseEvent } from "react";
import { activityStart, hasNotEnded, startsInFuture } from "@/lib/activity";
import { useQueryRecurrenceById } from "@/lib/hooks/query/activities/useQueryRecurrenceById";
import { invalidateActivities } from "@/lib/hooks/query/invalidate";
import { useQueryTags } from "@/lib/hooks/query/tags/useQueryTags";
import useDetailedItemModal from "@/lib/hooks/useDetailedItemModal";
import usePutTaskCompletion from "@/lib/hooks/usePutTaskCompletion";
import modalIds from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";

export function useDetailedActivity({
	activity,
}: {
	activity: PossiblySyntheticActivity;
}) {
	const { data: tags } = useQueryTags();
	const putCompletion = usePutTaskCompletion(activity);
	const humanizedStart = `${startsInFuture(activity) ? "starts" : "started"} ${activityStart(activity).fromNow()}`;
	const showHumanizedStart = hasNotEnded(activity);
	const { openDetailedItemModal } = useDetailedItemModal(
		"tag",
		modalIds.tags.detailed
	);
	const { openModal } = useModalState();
	const { data: recurrence } = useQueryRecurrenceById(activity.recurrence_id);

	const { mutate } = useMutation(trpc.activities.delete.byId.mutationOptions());

	function handleDeleteActivity(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		// prevents attempting to delete a synthetic activity
		if (activity.activity_id) {
			mutate(
				{ activity_id: activity.activity_id },
				{
					onSuccess: () => {
						invalidateActivities();
						// TODO (TRK-268) show a notification
					},
				}
			);
		}
	}
	return {
		tags,
		recurrence,
		humanizedStart,
		showHumanizedStart,
		openDetailedItemModal,
		openModal,
		putCompletion,
		handleDeleteActivity,
	};
}

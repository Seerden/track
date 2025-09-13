import { useDisclosure } from "@mantine/hooks";
import type { PossiblySyntheticActivity } from "@shared/lib/schemas/activity";
import { useMutation } from "@tanstack/react-query";
import { activityStart, hasNotEnded, startsInFuture } from "@/lib/activity";
import { useQueryRecurrenceById } from "@/lib/hooks/query/activities/useQueryRecurrenceById";
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
	const [opened, { close, toggle }] = useDisclosure(false);
	return {
		tags,
		recurrence,
		humanizedStart,
		showHumanizedStart,
		openDetailedItemModal,
		openModal,
		putCompletion,
		opened,
		close,
		toggle,
		mutate,
	};
}

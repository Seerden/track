import {
	useMutateNewActivity,
	useMutateNewRecurringActivity
} from "@/lib/hooks/query/activities/useMutateNewActivity";
import type { ModalId } from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { useModalState } from "@/lib/state/modal-state";
import { useTagSelection } from "@/lib/state/selected-tags-state";
import { trpc } from "@/lib/trpc";
import {
	newActivitySchema,
	newRecurrenceInputSchema,
	type ActivityWithIds,
	type NewActivity,
	type NewRecurrenceInput
} from "@shared/lib/schemas/activity";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { parseNewActivity, parseUpdatedActivity } from "./parse-activity";

export function useSubmitUpdatedActivity(
	activity: Partial<ActivityWithIds>,
	modalId?: ModalId
) {
	const { mutate: submit } = useMutation(trpc.activities.update.mutationOptions());
	const navigate = useNavigate();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function onSubmit() {
		const _activity = parseUpdatedActivity(activity);
		if (!_activity) return; // TODO: actually throw an error or provide UI feedback

		submit(
			{
				activity: _activity,
				tag_ids: selectedTagIds
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: trpc.activities.all.queryKey()
					});
					queryClient.invalidateQueries({
						queryKey: trpc.activities.recurrences.queryByUser.queryKey()
					});

					if (modalId) {
						closeModal(modalId);
					} else {
						navigate({ to: "/today" });
					}
				}
			}
		);
	}

	return { onSubmit };
}

export function useSubmitNewActivity({
	activity,
	modalId,
	recurrence,
	isRecurring
}: {
	activity: Partial<NewActivity>;
	modalId?: ModalId;
	recurrence?: NewRecurrenceInput;
	isRecurring?: boolean;
}) {
	const { mutate: submit } = useMutateNewActivity();
	const { mutate: submitNewRecurringActivity } = useMutateNewRecurringActivity();
	const navigate = useNavigate();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function handleSuccess() {
		queryClient.invalidateQueries({ queryKey: trpc.activities.all.queryKey() });
		queryClient.invalidateQueries({
			queryKey: trpc.activities.recurrences.queryByUser.queryKey()
		});
		if (modalId) closeModal(modalId);
		else navigate({ to: "/today" });
	}

	function onSubmit() {
		if (isRecurring) {
			const parsedActivity = newActivitySchema.safeParse({
				...activity,
				will_recur: true
			} as NewActivity);
			const parsedRecurrence = newRecurrenceInputSchema.safeParse(recurrence);

			if (!parsedActivity.success || !parsedRecurrence.success) {
				// TODO: notify (TRK-235?)
				console.log({
					error: "Invalid activity or recurrence data",
					activityError: parsedActivity.error,
					recurrenceError: parsedRecurrence.error
				});
				return;
			}

			submitNewRecurringActivity(
				{ activity: parsedActivity.data, recurrence: parsedRecurrence.data },
				{ onSuccess: handleSuccess }
			);
		} else {
			submit(
				{ activity: parseNewActivity(activity), tagIds: selectedTagIds },
				{ onSuccess: handleSuccess }
			);
		}
	}

	return { onSubmit };
}

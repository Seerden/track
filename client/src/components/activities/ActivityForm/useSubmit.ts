import {
	useMutateNewActivity,
	useMutateNewRecurringActivity,
} from "@/lib/hooks/query/activities/useMutateNewActivity";
import { invalidateActivities } from "@/lib/hooks/query/invalidate";
import type { ModalId } from "@/lib/modal-ids";
import { useModalState } from "@/lib/state/modal-state";
import { useTagSelection } from "@/lib/state/selected-tags-state";
import { trpc } from "@/lib/trpc";
import {
	activitySchema,
	newActivityInputSchema,
	newRecurrenceInputSchema,
	type ActivityWithIds,
	type NewActivity,
	type NewActivityInput,
	type NewRecurrenceInput,
} from "@shared/lib/schemas/activity";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { ActivityState } from "./activity-state.types";
import { parseNewActivity, parseUpdatedActivity } from "./parse-activity";

export function useSubmitUpdatedActivity({
	activity,
	modalId,
}: {
	activity: ActivityState;
	modalId?: ModalId;
}) {
	const { mutate: submit } = useMutation(
		trpc.activities.update.mutationOptions()
	);
	const navigate = useNavigate();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function handleSubmit() {
		if (!isExistingActivity(activity)) return;

		const parsedActivity = parseUpdatedActivity(activity);
		if (!parsedActivity) return; // TODO: actually throw an error or provide UI feedback

		submit(
			{
				activity: parsedActivity,
				tag_ids: selectedTagIds,
			},
			{
				onSuccess: () => {
					invalidateActivities();

					if (modalId) {
						closeModal(modalId);
					} else {
						navigate({ to: "/today" });
					}
				},
			}
		);
	}

	return { handleSubmit };
}

function isExistingActivity(
	activity: ActivityState
): activity is ActivityWithIds {
	return activitySchema.safeParse(activity).success;
}

export function useSubmitNewActivity({
	activity,
	modalId,
	recurrence,
	isRecurring,
}: {
	/**
	 * @note For the polymorphy of `activity` in useActivityForm, we type it as
	 * `ActivityState`, however, the submit handler defined in this function
	 * requires it to be a new activity. We check for this inside the `onSubmit`
	 * definition. */
	activity: ActivityState;
	modalId?: ModalId;
	recurrence?: NewRecurrenceInput;
	isRecurring?: boolean;
}) {
	const { mutate: submit } = useMutateNewActivity();
	const { mutate: submitNewRecurringActivity } =
		useMutateNewRecurringActivity();
	const navigate = useNavigate();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function handleSuccess() {
		invalidateActivities();

		if (modalId) {
			closeModal(modalId);
		} else {
			navigate({ to: "/today" });
		}
	}

	function handleSubmit() {
		if (isExistingActivity(activity)) return;

		if (isRecurring) {
			const parsedActivity = newActivityInputSchema.safeParse({
				...activity,
				will_recur: true,
			} as NewActivity);
			const parsedRecurrence = newRecurrenceInputSchema.safeParse(recurrence);

			if (!parsedActivity.success || !parsedRecurrence.success) {
				// TODO: notify (TRK-235?)
				console.log({
					error: "Invalid activity or recurrence data",
					activityError: parsedActivity.error,
					recurrenceError: parsedRecurrence.error,
				});
				return;
			}

			submitNewRecurringActivity(
				{
					activity: parseNewActivity(parsedActivity.data),
					recurrence: parsedRecurrence.data,
					tagIds: selectedTagIds,
				},
				{ onSuccess: handleSuccess }
			);
		} else {
			submit(
				{
					// NOTE: the isExistingActivity check ensures that activity is
					// `NewActivityInput`, but typescript isn't smart enough to not
					// have to type-cast this here.
					activity: parseNewActivity(activity as NewActivityInput),
					tagIds: selectedTagIds,
				},
				{ onSuccess: handleSuccess }
			);
		}
	}

	return { handleSubmit };
}

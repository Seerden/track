import type { DateTimeStateSetter } from "@/components/activities/ActivityForm/datetime-picker.types";
import type { ModalId } from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { useModalState } from "@/lib/state/modal-state";
import { trpc } from "@/lib/trpc";
import useAuthentication from "@lib/hooks/useAuthentication";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type {
	ActivityWithIds,
	NewActivity,
	WithDates,
	WithTimestamps
} from "@shared/lib/schemas/activity";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { parseNewActivity, parseUpdatedActivity } from "./parse-activity";

function useSubmitNewActivity(newActivity: Partial<NewActivity>, modalId?: ModalId) {
	const { mutate: submit } = useMutation(
		trpc.activities.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.activities.all.queryKey()
				});
			}
		})
	);
	const navigate = useNavigate();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		submit(
			{ activity: parseNewActivity(newActivity), tagIds: selectedTagIds },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: trpc.activities.all.queryKey()
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

function useSubmitUpdatedActivity(activity: Partial<ActivityWithIds>, modalId?: ModalId) {
	const { mutate: submit } = useMutation(trpc.activities.update.mutationOptions());
	const navigate = useNavigate();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

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

type UseActivityFormArgs = {
	initialIsTask?: boolean;
	modalId?: ModalId;
	activity?: ActivityWithIds;
};

type ActivityState = Partial<NewActivity> | Partial<ActivityWithIds>;

export default function useActivityForm({
	initialIsTask = false,
	modalId,
	activity: existingActivity
}: UseActivityFormArgs) {
	const { currentUser } = useAuthentication();
	const { resetTagSelection, setTagSelectionFromList } = useTagSelection();

	const isEditing = !!existingActivity;

	// TODO: this should not be Partial, but the full type. We can't do that
	// until TRK-83 is implemented.
	const defaultNewActivity: Partial<NewActivity> = {
		name: "",
		description: "",
		user_id: currentUser?.user_id,
		is_task: initialIsTask,
		occurrence: null,
		recurrence_id: null
	};

	const [activity, setActivity] = useState<ActivityState>(
		existingActivity ?? defaultNewActivity
	);

	const { onSubmit: onNewSubmit } = useSubmitNewActivity(activity, modalId);
	const { onSubmit: onUpdateSubmit } = useSubmitUpdatedActivity(activity, modalId);

	// TODO: the two useSubmit hooks have identical onSuccess callbacks. Maybe we
	// should define it in here, and pass it to the hooks as an argument.
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		return isEditing ? onUpdateSubmit(e) : onNewSubmit(e);
	}

	useEffect(() => {
		if (!isEditing) {
			resetTagSelection();
		} else {
			setTagSelectionFromList(existingActivity.tag_ids);
		}
	}, []);

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		setActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value
		}));
	}

	const onDateTimeChange: DateTimeStateSetter = ({ name, value }) => {
		setActivity((current) => ({
			...current,
			[name]: value
		}));
	};

	const title = existingActivity ? "Edit activity" : "Create an activity";
	const buttonTitle = existingActivity ? "Update activity" : "Create activity";

	const defaultDateTimeValues = existingActivity
		? ({
				started_at: existingActivity.started_at,
				ended_at: existingActivity.ended_at,
				start_date: existingActivity.start_date,
				end_date: existingActivity.end_date
			} as WithDates | WithTimestamps)
		: undefined;

	return {
		onSubmit,
		onInputChange,
		onDateTimeChange,
		isTask: !!activity.is_task,
		title,
		buttonTitle,
		defaultDateTimeValues
	};
}

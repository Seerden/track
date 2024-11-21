import type { DateTimeStateSetter } from "@/components/activities/ActivityForm/datetime-picker.types";
import useActivityMutation, {
	parseUpdatedActivity
} from "@/lib/hooks/query/activities/useActivityMutation";
import type { ModalId } from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useModalState } from "@/lib/state/modal-state";
import { useNewActivityMutation } from "@lib/hooks/query/activities/useNewActivityMutation";
import useAuthentication from "@lib/hooks/useAuthentication";
import useRouteProps from "@lib/hooks/useRouteProps";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { ActivityWithIds, NewActivity } from "@t/data/activity.types";
import { hasValidUserId } from "@t/data/user-id.guards";
import { useEffect, useState } from "react";
import { parseNewActivity } from "./parse-new-activity";

function useSubmitNewActivity(newActivity: Partial<NewActivity>, modalId?: ModalId) {
	const { mutate: submit } = useNewActivityMutation();
	const { navigate } = useRouteProps();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!hasValidUserId(newActivity)) return;

		submit(
			{ activity: parseNewActivity(newActivity), tagIds: selectedTagIds },
			{
				onSuccess: () => {
					navigate("/today"); // TODO: put routes in a variable

					queryClient.invalidateQueries({
						queryKey: qk.activities.all
					});

					if (modalId) closeModal(modalId);
				}
			}
		);
	}

	return { onSubmit };
}

function useSubmitUpdatedActivity(activity: Partial<ActivityWithIds>, modalId?: ModalId) {
	const { mutate: submit } = useActivityMutation();
	const { navigate } = useRouteProps();
	const { selectedTagIds } = useTagSelection();
	const { closeModal } = useModalState();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const _activity = parseUpdatedActivity(activity);
		if (!_activity) return; // TODO: actually throw an error or provide UI feedback

		submit(
			{
				activity: _activity as ActivityWithIds, /// TODO: this typecast may be problematic
				tag_ids: selectedTagIds
			},
			{
				onSuccess: () => {
					navigate("/today");

					queryClient.invalidateQueries({
						queryKey: qk.activities.all
					});

					if (modalId) {
						closeModal(modalId);
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

	const defaultNewActivity: Partial<NewActivity> = {
		name: "",
		description: "",
		user_id: currentUser?.user_id,
		is_task: initialIsTask
	};

	const [activity, setActivity] = useState<ActivityState>(
		existingActivity ?? defaultNewActivity
	);

	useEffect(() => {
		console.log({ activity });
	}, [activity]);

	const { onSubmit: onNewSubmit } = useSubmitNewActivity(activity, modalId);
	const { onSubmit: onUpdateSubmit } = useSubmitUpdatedActivity(activity, modalId);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		console.log({ modalId, bool: 1 });

		return isEditing ? onUpdateSubmit(e) : onNewSubmit(e);
	}

	useEffect(() => {
		if (!isEditing) {
			resetTagSelection();
		} else {
			// set tag selection to activity.tag_ids
			setTagSelectionFromList((activity as ActivityWithIds).tag_ids);
		}
	}, []);

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		setActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value
		}));
	}

	// TODO: this is functionally the same as onInputChange, except the typing is
	// different. Do we need a type for onDateTimeChange from DateTimePicker?
	const onDateTimeChange: DateTimeStateSetter = ({ name, value }) => {
		setActivity((current) => ({
			...current,
			[name]: value
		}));
	};

	return {
		onSubmit,
		onInputChange,
		onDateTimeChange,
		isTask: !!activity.is_task
	};
}

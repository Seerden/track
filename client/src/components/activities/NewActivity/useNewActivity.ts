import type { DateTimeStateSetter } from "@/components/activities/NewActivity/datetime-picker.types";
import type { ModalId } from "@/lib/modal-ids";
import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useModalState } from "@/lib/state/modal-state";
import { useNewActivityMutation } from "@lib/hooks/query/activities/useNewActivityMutation";
import useAuthentication from "@lib/hooks/useAuthentication";
import useRouteProps from "@lib/hooks/useRouteProps";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { NewActivity } from "@t/data/activity.types";
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

export default function useNewActivity({
	initialIsTask = false,
	modalId
}: {
	initialIsTask?: boolean;
	modalId?: ModalId;
}) {
	const { currentUser } = useAuthentication();
	const { resetTagSelection } = useTagSelection();

	const [newActivity, setNewActivity] = useState<Partial<NewActivity>>(() => ({
		name: "",
		description: "",
		user_id: currentUser?.user_id,
		is_task: initialIsTask
	}));

	const { onSubmit } = useSubmitNewActivity(newActivity, modalId);

	useEffect(() => {
		resetTagSelection();
	}, []);

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		setNewActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value
		}));
	}

	// TODO: this is functionally the same as onInputChange, except the typing is
	// different. Do we need a type for onDateTimeChange from DateTimePicker?
	const onDateTimeChange: DateTimeStateSetter = ({ name, value }) => {
		setNewActivity((current) => ({
			...current,
			[name]: value
		}));
	};

	return {
		onSubmit,
		onInputChange,
		onDateTimeChange,
		isTask: !!newActivity.is_task
	};
}

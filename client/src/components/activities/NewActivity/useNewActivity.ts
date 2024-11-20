import { queryClient } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useModalState } from "@/lib/state/modal-state";
import type { DateTimeField } from "@/types/form.types";
import { useNewActivityMutation } from "@lib/hooks/query/activities/useNewActivityMutation";
import useAuthentication from "@lib/hooks/useAuthentication";
import useRouteProps from "@lib/hooks/useRouteProps";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { NewActivity } from "@t/data/activity.types";
import { hasValidUserId } from "@t/data/user-id.guards";
import type { Datelike } from "@t/data/utility.types";
import { useEffect, useMemo, useState } from "react";
import { parseNewActivity } from "./parse-new-activity";

export default function useNewActivity({
	initialIsTask = false,
	modalId
}: {
	initialIsTask?: boolean;
	modalId?: string;
}) {
	const { mutate: submit } = useNewActivityMutation();
	const { navigate } = useRouteProps();
	const { currentUser } = useAuthentication();
	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const { closeModal } = useModalState();

	const [newActivity, setNewActivity] = useState<Partial<NewActivity>>(() => ({
		name: "",
		description: "",
		user_id: currentUser?.user_id,
		is_task: initialIsTask
	}));

	useEffect(() => {
		resetTagSelection();
	}, []);

	const isTask = useMemo(() => !!newActivity.is_task, [newActivity.is_task]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!hasValidUserId(newActivity)) return;

		submit(
			{ activity: parseNewActivity(newActivity), tagIds: selectedTagIds },
			{
				onSuccess: () => {
					// TODO: put routes in a variable
					navigate("/today");
					queryClient.invalidateQueries({
						queryKey: qk.activities.all
					});
					if (modalId) closeModal(modalId);
				}
			}
		);
	}

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value } = e.target;

		setNewActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? !current.is_task : value
		}));
	}

	// TODO: this is functionally the same as onInputChange, except the typing is
	// different. Do we need a type for onDateTimeChange from DateTimePicker?
	function onDateTimeChange({ name, value }: { name: DateTimeField; value: Datelike }) {
		setNewActivity((current) => ({
			...current,
			[name]: value
		}));
	}

	return {
		onSubmit,
		onInputChange,
		onDateTimeChange,
		isTask
	};
}

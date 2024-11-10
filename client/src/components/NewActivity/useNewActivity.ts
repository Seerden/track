import { queryClient } from "@/lib/query-client";
import { useModalState } from "@/lib/state/modal-state";
import useAuthentication from "@/lib/useAuthentication";
import useRouteProps from "@/lib/useRouteProps";
import type { Datelike } from "@/types/date.types";
import { hasUserId } from "@/types/server/user-id.guards";
import { useTagSelection } from "@lib/state/selected-tags-state";
import type { DateTimeField } from "@type/form.types";
import type { NewActivity } from "@type/server/activity.types";
import { useEffect, useMemo, useState } from "react";
import { parseNewActivity } from "./parse-new-activity";
import { useNewActivityMutation } from "./useNewActivityMutation";

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

	const { closeModal } = useModalState();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!hasUserId(newActivity)) return;

		submit(
			{ activity: parseNewActivity(newActivity), tagIds: selectedTagIds },
			{
				onSuccess: () => {
					// TODO: only navigate if not already on the today page
					navigate("/today"); // TODO: put routes in a variable
					queryClient.invalidateQueries({ queryKey: ["activities"] });
					// only close modal if it's open, but that is the behavior by
					// design anyway
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

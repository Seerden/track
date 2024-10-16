import { hasUserId } from "@/types/server/user-id.guards";
import { useTagSelection } from "@lib/state/selected-tags-state";
import useAuthentication from "@lib/use-authentication";
import useRouteProps from "@lib/use-route-props";
import type { DateTimeField } from "@type/form.types";
import type { NewActivity } from "@type/server/activity.types";
import { useEffect, useMemo, useState } from "react";
import { parseNewActivity } from "./parse-new-activity";
import { useNewActivityMutation } from "./use-new-activity-mutation";

export default function useNewActivity() {
	const { mutate: submit } = useNewActivityMutation();
	const { navigate } = useRouteProps();
	const { currentUser } = useAuthentication();
	const { selectedTagIds, resetTagSelection } = useTagSelection();
	const [newActivity, setNewActivity] = useState<Partial<NewActivity>>(() => ({
		name: "",
		description: "",
		user_id: currentUser?.user_id,
	}));

	useEffect(() => {
		resetTagSelection();
	}, []);

	const isTask = useMemo(() => newActivity.is_task, [newActivity.is_task]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!hasUserId(newActivity)) return;

		submit(
			{ activity: parseNewActivity(newActivity), tagIds: selectedTagIds },
			{
				onSuccess: () => {
					navigate("/activities"); // TODO: put routes in a variable
				},
			},
		);
	}

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { type, name, value, checked } = e.target;

		setNewActivity((current) => ({
			...current,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	function onDateTimeChange({ name, value }: { name: DateTimeField; value: string }) {
		setNewActivity((current) => ({
			...current,
			[name]: value,
		}));
	}

	return {
		onSubmit,
		onInputChange,
		onDateTimeChange,
		isTask,
	};
}

import { useState } from "react";
import { useTagSelection } from "../../lib/state/selected-tags-state";
import useAuthentication from "../../lib/use-authentication";
import useRouteProps from "../../lib/use-route-props";
import { DateTimeField } from "../../types/form.types";
import type { NewActivity } from "../../types/server/activity.types";
import { useNewActivityMutation } from "./use-new-activity-mutation";

export default function useNewActivity() {
	const { mutate: submit } = useNewActivityMutation();
	const { navigate } = useRouteProps();
	const { currentUser } = useAuthentication();
	const { selectedTagIds } = useTagSelection();
	// TODO: typing below is only Partial because the typing thinks user_id may be null, when it can't
	// actually be null because this component will always be rendered as
	// Protected. Maybe we make user_id optional and check for it in the
	// mutation, or server-side, or we leave it out entirely and let the server
	// handle it. Needs more thought.
	const [newActivity, setNewActivity] = useState<Partial<NewActivity>>(() => ({
		name: "",
		description: "",
		user_id: currentUser?.user_id,
	}));

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		submit(
			// NOTE: We type newActivity as NewActivity because of the user_id, which
			// typescript thinks is nullable. I think it's fine like this for now
			// but it does become a potential source for bugs if currentUser ever
			// doesn't exist when this function is called.
			{ activity: newActivity as NewActivity, tagIds: selectedTagIds },
			{
				onSuccess: () => {
					navigate("/activities");
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
	};
}

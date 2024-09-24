import { useEffect, useState } from "react";
import useAuthentication from "../../lib/use-authentication";
import { DateTimeField } from "../../types/form.types";
import type { NewActivity } from "../../types/server/activity.types";
import { useNewActivityMutation } from "./use-new-activity-mutation";

export default function useNewActivity() {
	const { mutate: submit } = useNewActivityMutation();
	const { currentUser } = useAuthentication();
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

	useEffect(() => {
		console.log({ newActivity });
	}, [newActivity]);

	// TODO: handle tag selection!

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		submit(newActivity as NewActivity);
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

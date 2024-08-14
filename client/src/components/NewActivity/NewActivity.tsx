import { useState } from "react";
import { type NewActivity } from "../../types/server/activity.types";

function NewActivity() {
	const [activity, setActivity] = useState<NewActivity>({
		user_id: 0, // TODO: get this from global state
		name: "",
		description: ""
	});

	/**
	 * make the actual query, then move on or show a success toast or something
	 **/
	function submitActivity() {}

	return <></>;
}

export default NewActivity;

import { useState } from "react";
import { type NewActivity } from "../../types/server/activity.types";
import { DateTimePicker } from "./DateTimePicker";
import * as S from "./DateTimePicker.style";
import * as N from "./NewActivity.style";

function NewActivity() {
	const [activity, setActivity] = useState<NewActivity>({
		user_id: 0, // TODO: get this from global state
		name: "",
		description: ""
	});

	const [allDay, setAllDay] = useState(false);

	/**
	 * make the actual query, then move on or show a success toast or something
	 **/
	function submitActivity() {}

	return (
		<N.Wrapper>
			<h1>Create an activity</h1>
			<N.Form>
				<N.Row name="description">
					<S.Label>
						Name
						<input type="text" required />
					</S.Label>
					<S.Label>
						Description (optional)
						<input type="text" />
					</S.Label>
				</N.Row>

				{/* datetime picker goes here */}
				<N.Row>
					<DateTimePicker />
				</N.Row>

				{/* tag selector component goes here */}

				<N.Button>Create activity</N.Button>
			</N.Form>
		</N.Wrapper>
	);
}

export default NewActivity;

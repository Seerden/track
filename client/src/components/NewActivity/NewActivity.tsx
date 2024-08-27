import { useState } from "react";
import { type NewActivity } from "../../types/server/activity.types";

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
		<div>
			<h1>Create an activity</h1>
			<form>
				<fieldset name="description">
					<label>
						Name
						<input />
					</label>
					<label>
						Description
						<textarea />
					</label>
				</fieldset>
				<fieldset name="grouping">
					<label>Tags</label>
				</fieldset>
				<fieldset name="time">
					<h2>Time and date</h2>
					<label htmlFor="started_at-">Start time</label>
					<input
						type="checkbox"
						checked={allDay}
						onChange={(e) => setAllDay(e.target.checked)}
					/>
					<input
						name="started_at"
						type="datetime-local"
						value={activity.started_at}
						onChange={
							(e) => {
								console.log(+new Date(e.target.value));
							}
							// setActivity({ ...activity, started_at: +e.target.value })
						}
					/>
					<label>End time</label>
					<input name="ended_at" type="datetime-local" value={activity.ended_at} />
				</fieldset>

				<fieldset>
					<h2>Tags</h2>
					<input type="text" />
					<span>v</span>
				</fieldset>
			</form>
		</div>
	);
}

export default NewActivity;

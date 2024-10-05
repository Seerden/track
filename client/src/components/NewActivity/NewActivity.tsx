import { type NewActivity } from "../../types/server/activity.types";
import TagSelector from "../TagSelector/TagSelector";
import * as N from "./NewActivity.style";
import NewDateTimePicker from "./NewDateTimePicker";
import useNewActivity from "./use-new-activity";

function NewActivity() {
	const { onInputChange, onSubmit, onDateTimeChange } = useNewActivity();

	return (
		<N.Wrapper>
			<h1>Create an activity</h1>
			<N.Form onSubmit={onSubmit}>
				<N.Row name="description">
					<N.Label>
						Name
						<input name="name" onChange={onInputChange} type="text" required />
					</N.Label>
					<N.Label>
						Description (optional)
						<input name="description" type="text" onChange={onInputChange} />
					</N.Label>
					<N.Label>
						Task?
						<input name="is_task" type="checkbox" onChange={onInputChange} />
					</N.Label>
				</N.Row>

				<N.Row>
					<NewDateTimePicker setState={onDateTimeChange} />
				</N.Row>

				<N.Row>
					<TagSelector fullSize title="Tags" showNewTagButton />
				</N.Row>

				<N.Button>Create activity</N.Button>
			</N.Form>
		</N.Wrapper>
	);
}

export default NewActivity;

import { type NewActivity } from "../../types/server/activity.types";
import TagSelector from "../TagSelector/TagSelector";
import { DateTimePicker } from "./DateTimePicker";
import * as S from "./DateTimePicker.style";
import * as N from "./NewActivity.style";
import useNewActivity from "./use-new-activity";

function NewActivity() {
	const { onInputChange, onSubmit, onDateTimeChange } = useNewActivity();

	return (
		<N.Wrapper>
			<h1>Create an activity</h1>
			<N.Form onSubmit={onSubmit}>
				<N.Row name="description">
					<S.Label>
						Name
						<input name="name" onChange={onInputChange} type="text" required />
					</S.Label>
					<S.Label>
						Description (optional)
						<input name="description" type="text" onChange={onInputChange} />
					</S.Label>
					<S.Label>
						Task?
						<input name="is_task" type="checkbox" onChange={onInputChange} />
					</S.Label>
				</N.Row>

				{/* datetime picker goes here */}
				<N.Row>
					<DateTimePicker setState={onDateTimeChange} />
				</N.Row>

				{/* tag selector component goes here */}
				<N.Row>
					<TagSelector fullSize title="Tags" />
				</N.Row>

				<N.Button>Create activity</N.Button>
			</N.Form>
		</N.Wrapper>
	);
}

export default NewActivity;

import modalIds from "@/lib/modal-ids";
import { Checkbox } from "@lib/theme/components/Checkbox";
import { type NewActivity } from "@type/server/activity.types";
import TagSelector from "../TagSelector/TagSelector";
import DateTimePicker from "./DateTimePicker";
import * as N from "./NewActivity.style";
import useNewActivity from "./use-new-activity";

function NewActivity() {
	const { onInputChange, onSubmit, onDateTimeChange, isTask } = useNewActivity();

	return (
		<N.Wrapper>
			<h1>Create an activity</h1>
			<N.Form onSubmit={onSubmit}>
				<N.Row name="description">
					<N.Label>
						<span>Title</span>
						<input name="name" onChange={onInputChange} type="text" required />
					</N.Label>
					{/* TODO: for now I'm removing the description field from here -- want to implement Notes for this */}
					{/* <N.Label>
						<span>Description (optional)</span>
						<input name="description" type="text" onChange={onInputChange} />
					</N.Label> */}
					<N.Task>
						<span>Task?</span>
						<input name="is_task" type="checkbox" onChange={onInputChange} />
						<Checkbox checked={isTask} />
					</N.Task>
				</N.Row>

				<N.Row>
					<DateTimePicker setState={onDateTimeChange} />
				</N.Row>

				<N.Row>
					<TagSelector
						fullSize
						title="Tags"
						showNewTagButton
						modalId={modalIds.tagSelector.newActivity}
					/>
				</N.Row>

				<N.Button>Create activity</N.Button>
			</N.Form>
		</N.Wrapper>
	);
}

export default NewActivity;

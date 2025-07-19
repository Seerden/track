import RecurrenceForm from "@/components/activities/ActivityForm/RecurrenceForm/RecurrenceForm";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Form from "@/lib/theme/components/form.style";
import Input from "@/lib/theme/input";
import TagSelector from "@components/tags/TagSelector/TagSelector";
import type { ActivityWithIds } from "@shared/lib/schemas/activity";
import DateTimePicker from "./DateTimePicker";
import S from "./style/ActivityForm.style";
import useActivityForm from "./useActivityForm";

type ActivityFormProps = {
	isTask?: boolean;
	modalId?: ModalId;
	activity?: ActivityWithIds;
};

/** This component functions as a form to create a new activity, or to update an
 * existing one. As such, when you pass `activity` as a prop, this indicates you
 * want to edit an existing one, in which case you don't need to pass any other
 * props. */
export default function ActivityForm({
	activity,
	isTask: initialIsTask,
	modalId
}: ActivityFormProps) {
	const {
		onSubmit,
		onInputChange,
		onDateTimeChange,
		isTask,
		title,
		buttonTitle,
		defaultDateTimeValues,
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		setSelection,
		resetSelection,
		validRecurrence
	} = useActivityForm({
		initialIsTask,
		modalId,
		activity
	});

	return (
		<Form.Wrapper>
			<Form.FormTitle>{title}</Form.FormTitle>
			<Form.Form onSubmit={onSubmit}>
				<Form.Row name="description">
					<Form.Label>
						<span>Activity</span>
						<Input.Default
							name="name"
							onChange={onInputChange}
							defaultValue={activity?.name}
							type="text"
							required
						/>
					</Form.Label>
					<S.Task>
						<span>Task?</span>
						<Checkbox name="is_task" checked={isTask} onChange={onInputChange} />
					</S.Task>
				</Form.Row>
				<Form.Row>
					<DateTimePicker
						onChange={onDateTimeChange}
						defaultValues={defaultDateTimeValues}
					/>
				</Form.Row>

				<Form.Row>
					<RecurrenceForm
						isRecurring={isRecurring}
						recurrence={recurrence}
						intervalUnitSuffix={intervalUnitSuffix}
						resetSelection={resetSelection}
						toggleRecurring={toggleRecurring}
						updateRecurrence={updateRecurrence}
						setSelection={setSelection}
						validRecurrence={validRecurrence}
					/>
				</Form.Row>
				<TagSelector
					fullSize
					title="Tags"
					showNewTagButton
					modalId={modalIds.tagSelector.activityForm}
				/>
				<Buttons.Submit.Default type="submit">{buttonTitle}</Buttons.Submit.Default>
			</Form.Form>
		</Form.Wrapper>
	);
}

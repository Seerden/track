import TagSelector from "@components/tags/TagSelector/TagSelector";
import { FocusTrap, TextInput, Tooltip } from "@mantine/core";
import type {
	NewActivityInput,
	PossiblySyntheticActivity,
} from "@shared/lib/schemas/activity";
import {
	LucideCalendarClock,
	LucideDotSquare,
	LucideRepeat,
} from "lucide-react";
import RecurrenceForm from "@/components/activities/ActivityForm/RecurrenceForm/RecurrenceForm";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import type { ModalId } from "@/lib/modal-ids";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Form from "@/lib/theme/components/form.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import DateTimePicker from "./DateTimePicker";
import useActivityForm from "./useActivityForm";
import useDateTimePicker from "./useDateTimePicker";

/** This component functions as a form to create a new activity, or to update an
 * existing one. As such, when you pass `activity` as a prop, this indicates you
 * want to edit an existing one, in which case you don't need to pass any other
 * props. */
export default function ActivityForm({
	activity: initialActivity,
	isTask: initialIsTask,
	modalId,
}: {
	isTask?: boolean;
	modalId?: ModalId;
	activity?: PossiblySyntheticActivity;
}) {
	const {
		handleSubmit,
		handleInputChange,
		setActivity,
		activity,
		isTask,
		title,
		buttonTitle,
		isRecurring,
		recurrence,
		intervalUnitSuffix,
		toggleRecurring,
		updateRecurrence,
		setSelection,
		resetSelection,
		validActivity,
		validRecurrence,
	} = useActivityForm({
		initialIsTask,
		modalId,
		activity: initialActivity,
	});

	const { handleDateChange, handleAllDayChange, allDay, dates } =
		useDateTimePicker({
			activity,
			setActivity,
		});

	return (
		<FocusTrap active>
			<Form.Wrapper style={{ width: "450px" }}>
				<Form.FormTitle>{title}</Form.FormTitle>
				<Form.Form onSubmit={handleSubmit}>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: spacingValue.medium,
							padding: spacingValue.small,
						}}>
						<Tooltip
							id="is-task-label"
							aria-label="Is this a task?"
							label="Is this a task?"
							withArrow>
							<label>
								<Checkbox
									aria-labelledby="is-task-label"
									size={23}
									name={"is_task" satisfies keyof NewActivityInput}
									checked={isTask}
									onChange={handleInputChange}
								/>
							</label>
						</Tooltip>

						<Tooltip
							id="all-day-label"
							aria-label="Does this activity last all day?"
							label="Does this activity last all day?"
							withArrow>
							<label>
								<Checkbox
									aria-labelledby="all-day-label"
									size={23}
									name="allDay"
									checked={allDay}
									onChange={handleAllDayChange}
									IconOn={LucideCalendarClock}
									IconOff={LucideCalendarClock}
								/>
							</label>
						</Tooltip>

						<Tooltip
							id="is-recurring-label"
							aria-label="Is this a recurring activity?"
							label="Is this a recurring activity?"
							withArrow>
							<label>
								<Checkbox
									aria-labelledby="is-recurring-label"
									IconOn={LucideRepeat}
									IconOff={LucideDotSquare}
									size={23}
									checked={isRecurring}
									onChange={toggleRecurring}
								/>
							</label>
						</Tooltip>
					</div>
					<Form.Row
						style={{ position: "relative", padding: spacingValue.small }}>
						<TextInput
							style={{
								paddingTop: spacingValue.small,
								width: "100%",
							}}
							label="Activity"
							name={"name" satisfies keyof NewActivityInput}
							onChange={handleInputChange}
							defaultValue={activity?.name}
							type="text"
							required
						/>
					</Form.Row>

					<DateTimePicker
						allDay={allDay}
						dates={dates}
						handleDateChange={handleDateChange}
					/>

					{isRecurring && (
						<Form.Row>
							<RecurrenceForm
								isRecurring={isRecurring}
								recurrence={recurrence}
								intervalUnitSuffix={intervalUnitSuffix}
								resetSelection={resetSelection}
								updateRecurrence={updateRecurrence}
								setSelection={setSelection}
								validRecurrence={validRecurrence}
							/>
						</Form.Row>
					)}

					<TagSelector
						tagSelectorId={TAG_SELECTOR_IDS.DEFAULT}
						fullSize
						title="Tags"
						showNewTagButton
						modalId={modalIds.tagSelector.activityForm}
					/>
					{/* TODO: disable the button until everything is valid (activity fields, 
               recurrence fields, etc.) */}
					<Buttons.Submit.Default
						type="submit"
						disabled={!(validActivity && (validRecurrence || !isRecurring))}>
						{buttonTitle}
					</Buttons.Submit.Default>
				</Form.Form>
			</Form.Wrapper>
		</FocusTrap>
	);
}

import Form from "@lib/theme/components/form.style";
import { TextInput } from "@mantine/core";
import { DatePickerInput, type DateValue } from "@mantine/dates";
import type { NewHabit } from "@shared/lib/schemas/habit";
import {
	HabitFormProvider,
	useHabitFormContext,
} from "@/components/habits/HabitForm/useHabitFormContext";
import { TAG_SELECTOR_IDS } from "@/components/tags/TagSelector/constants";
import TagSelector from "@/components/tags/TagSelector/TagSelector";
import { CheckboxIcon } from "@/components/utility/Checkbox/Checkbox";
import { createDate } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import Input from "@/lib/theme/input";
import S from "./style/NewHabit.style";
import useNewHabit from "./useNewHabit";

export default function HabitForm() {
	const { onSubmit } = useNewHabit();

	return (
		<HabitFormProvider>
			<Form.Wrapper>
				<Form.FormTitle>Start a new habit</Form.FormTitle>
				<Form.Form onSubmit={onSubmit}>
					<Form.Row>
						<SimpleField required name="name" label="Habit name" />
						<SimpleField name="description" label="Description" />
					</Form.Row>
					<OccurrenceFields />
					<ProgressionFields />
					<Form.Row
						style={{
							position: "relative",
							flexDirection: "column",
						}}
					>
						<S.DateFields>
							<StartDateField />
							<EndDateField />
						</S.DateFields>
					</Form.Row>
					<TagSelector
						tagSelectorId={TAG_SELECTOR_IDS.DEFAULT}
						modalId={modalIds.tagSelector.newHabit}
						showNewTagButton
						title="Add tags"
					/>
					{/* TODO: disable when invalid */}
					<Buttons.Submit.Default type="submit" disabled={false}>
						Create habit
					</Buttons.Submit.Default>
				</Form.Form>
			</Form.Wrapper>
		</HabitFormProvider>
	);
}

function SimpleField({
	required,
	name,
	label,
}: {
	required?: boolean;
	name: keyof NewHabit;
	label: string;
}) {
	const { onInputChange } = useHabitFormContext();

	return (
		<TextInput
			label={label}
			type="text"
			onChange={onInputChange}
			name={name}
			required={required}
		/>
	);
}

function TargetField() {
	const { onInputChange, habit } = useHabitFormContext();

	return (
		<S.Label>
			<span>target</span>
			<Input.Default
				style={{
					width: "95px",
					fontSize: font.size["0.82"],
				}}
				type="number"
				name="goal"
				value={habit.goal ?? ""}
				onChange={onInputChange}
				placeholder="e.g. 10.000"
				disabled={habit.goal_type !== "goal"}
				required={habit.goal_type === "goal"}
			/>
		</S.Label>
	);
}

function UnitField() {
	const { onInputChange, habit } = useHabitFormContext();

	return (
		<S.Label>
			<span>unit</span>
			{/* TODO TRK-231: rename this Inputs.Default, 
                              then extend this in NewHabit.style with 
                              the with and font size */}
			<Input.Default
				style={{
					width: "75px",
					fontSize: font.size["0.82"],
				}}
				type="text"
				name="goal_unit"
				value={habit.goal_unit ?? ""}
				onChange={onInputChange}
				placeholder="e.g. steps"
				disabled={habit.goal_type !== "goal"}
				required={habit.goal_type === "goal"}
			/>
		</S.Label>
	);
}

// TODO (TRK-112) combine StartDateField and EndDateField
function StartDateField() {
	const { habit, handleDateChange } = useHabitFormContext();
	const timestamp = habit.start_timestamp;

	function handleChange(value: DateValue) {
		handleDateChange({
			value: value ? createDate(value) : null,
			field: "start_timestamp",
		});
	}

	return (
		<DatePickerInput
			label="Start date"
			name="start_timestamp"
			value={timestamp ? createDate(timestamp).toDate() : undefined}
			onChange={handleChange}
			required
		/>
	);
}

function EndDateField() {
	const { habit, handleDateChange } = useHabitFormContext();
	const timestamp = habit.end_timestamp;
	const min = habit.start_timestamp;

	function handleChange(value: DateValue) {
		handleDateChange({
			value: value ? createDate(value) : null,
			field: "end_timestamp",
		});
	}

	return (
		<DatePickerInput
			placeholder="Lasts indefinitely"
			label="End date"
			clearable
			name="end_timestamp"
			value={timestamp ? createDate(timestamp).toDate() : undefined}
			onChange={handleChange}
			minDate={min ? createDate(min).toDate() : undefined}
		/>
	);
}

function OccurrenceFields() {
	const { onInputChange, maybePlural, habit } = useHabitFormContext();

	return (
		<Form.CompactRow>
			I want to do this
			<Input.Default
				type="number"
				min={1}
				step={1}
				defaultValue={1}
				name="frequency"
				onChange={onInputChange}
			/>{" "}
			<S.FixedLengthString>
				time{habit.frequency > 1 && "s"}
			</S.FixedLengthString>{" "}
			every
			<Input.Default
				name="interval"
				onChange={onInputChange}
				min={1}
				step={1}
				defaultValue={1}
				type="number"
			/>{" "}
			<S.Select name="interval_unit" onChange={onInputChange}>
				{["day", "week", "month", "year"].map((unit) => (
					<option key={unit} value={unit}>
						{maybePlural(unit)}
					</option>
				))}
			</S.Select>
		</Form.CompactRow>
	);
}

function ProgressionFields() {
	const { handleGoalTypeChange, habit, onInputChange } = useHabitFormContext();

	return (
		<S.ProgressionFieldset>
			<S.ProgressionTitle>
				How do you want to track your progress for this habit?
			</S.ProgressionTitle>
			<S.RadioField aria-label="Choose how to track your progress">
				<S.RadioOption>
					<S.RadioButton
						type="radio"
						name="goal_type"
						value="checkbox"
						checked={habit.goal_type === "checkbox"}
						onChange={handleGoalTypeChange}
					/>
					<S.RadioLabelText>
						<CheckboxIcon checked={habit.goal_type === "checkbox"} />
						with a checkbox
					</S.RadioLabelText>
				</S.RadioOption>
				<S.RadioOption>
					<S.RadioButton
						type="radio"
						name="goal_type"
						checked={habit.goal_type === "goal"}
						value="goal"
						onChange={onInputChange}
					/>
					<S.RadioLabelText>
						<CheckboxIcon checked={habit.goal_type === "goal"} />
						with a detailed goal
					</S.RadioLabelText>
					<Containers.Row gap="small">
						<TargetField />
						<UnitField />
					</Containers.Row>
				</S.RadioOption>
			</S.RadioField>
		</S.ProgressionFieldset>
	);
}

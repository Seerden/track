import TagSelector from "@/components/tags/TagSelector/TagSelector";
import { CheckboxIcon } from "@/components/utility/Checkbox/Checkbox";
import { formatToYearMonthDay } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";
import modalIds from "@/lib/modal-ids";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Input from "@/lib/theme/input";
import Form from "@lib/theme/components/form.style";
import { LucideCalendarOff, LucideCalendarPlus } from "lucide-react";
import S from "./style/NewHabit.style";
import useNewHabit, { type NewHabitWithoutUserId } from "./useNewHabit";

export default function NewHabit() {
	const {
		habit,
		onInputChange,
		maybePlural,
		hasEndDate,
		onSubmit,
		handleGoalTypeChange,
		handleClearEndDate,
		enableEndDate
	} = useNewHabit();

	return (
		<Form.Wrapper>
			<Form.FormTitle>Start a new habit</Form.FormTitle>
			<Form.Form onSubmit={onSubmit}>
				<Form.Row>
					<SimpleField
						onChange={onInputChange}
						required
						name="name"
						label="Habit name"
					/>
					<SimpleField
						onChange={onInputChange}
						name="description"
						label="Description"
					/>
				</Form.Row>
				<OccurrenceFields
					maybePlural={maybePlural}
					onChange={onInputChange}
					habit={habit}
				/>
				<ProgressionFields
					habit={habit}
					handleGoalTypeChange={handleGoalTypeChange}
					handleInputChange={onInputChange}
				/>
				<Form.Row
					style={{
						position: "relative",
						flexDirection: "column"
					}}
				>
					{hasEndDate && (
						<S.ClearEndDateButtonWrapper>
							<Buttons.Action.Default
								type="button"
								$color="red"
								onClick={handleClearEndDate}
							>
								<LucideCalendarOff size={16} color="white" />
							</Buttons.Action.Default>
						</S.ClearEndDateButtonWrapper>
					)}
					<S.DateFields>
						<StartDateField habit={habit} onChange={onInputChange} />
						{hasEndDate ? (
							<EndDateField habit={habit} onChange={onInputChange} />
						) : (
							<S.SetEndDateButton $color="theme" onClick={enableEndDate}>
								Add end date <LucideCalendarPlus size={15} />
							</S.SetEndDateButton>
						)}
					</S.DateFields>
				</Form.Row>
				<TagSelector
					modalId={modalIds.tagSelector.newHabit}
					showNewTagButton
					title="Add tags"
				/>
				<Buttons.Submit.Default type="submit">Create habit</Buttons.Submit.Default>
			</Form.Form>
		</Form.Wrapper>
	);
}

function SimpleField({
	onChange,
	required,
	name,
	label
}: {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	name: keyof NewHabitWithoutUserId;
	label: string;
}) {
	return (
		<Form.Label>
			<span>{label}</span>
			<Input.Default type="text" onChange={onChange} name={name} required={required} />
		</Form.Label>
	);
}

type FieldProps = {
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	habit: NewHabitWithoutUserId;
};

function TargetField({ onChange, habit }: FieldProps) {
	return (
		<S.Label>
			<span>target</span>
			<Input.Default
				style={{
					width: "95px",
					fontSize: "0.82rem"
				}}
				type="number"
				name="goal"
				value={habit.goal ?? ""}
				onChange={onChange}
				placeholder="e.g. 10.000"
				disabled={habit.goal_type !== "goal"}
				required={habit.goal_type === "goal"}
			/>
		</S.Label>
	);
}

function UnitField({ onChange, habit }: FieldProps) {
	return (
		<S.Label>
			<span>unit</span>
			{/* TODO TRK-231: rename this Inputs.Default, 
                              then extend this in NewHabit.style with 
                              the with and font size */}
			<Input.Default
				style={{
					width: "75px",
					fontSize: "0.82rem"
				}}
				type="text"
				name="goal_unit"
				value={habit.goal_unit ?? ""}
				onChange={onChange}
				placeholder="e.g. steps"
				disabled={habit.goal_type !== "goal"}
				required={habit.goal_type === "goal"}
			/>
		</S.Label>
	);
}

function StartDateField({ onChange, habit }: FieldProps) {
	return (
		<Form.Label>
			<span>Start date</span>
			<Input.Default
				type="date"
				name="start_timestamp"
				value={formatToYearMonthDay(createDate(habit.start_timestamp))}
				onChange={onChange}
				required
			/>
		</Form.Label>
	);
}

function EndDateField({ onChange, habit }: FieldProps) {
	return (
		<Form.Label>
			<span>End date</span>
			<Input.Default
				type="date"
				name="end_timestamp"
				value={
					habit.end_timestamp
						? formatToYearMonthDay(createDate(habit.end_timestamp))
						: undefined
				}
				onChange={onChange}
				required
			/>
		</Form.Label>
	);
}

function OccurrenceFields({
	onChange,
	habit,
	maybePlural
}: FieldProps & {
	maybePlural: (unit: string) => string;
}) {
	return (
		<Form.CompactRow>
			I want to do this
			<Input.Default
				type="number"
				min={1}
				step={1}
				defaultValue={1}
				name="frequency"
				onChange={onChange}
			/>{" "}
			<S.FixedLengthString>time{habit.frequency > 1 && "s"}</S.FixedLengthString> every
			<Input.Default
				name="interval"
				onChange={onChange}
				min={1}
				step={1}
				defaultValue={1}
				type="number"
			/>{" "}
			<S.Select name="interval_unit" onChange={onChange}>
				{["day", "week", "month", "year"].map((unit) => (
					<option key={unit} value={unit}>
						{maybePlural(unit)}
					</option>
				))}
			</S.Select>
		</Form.CompactRow>
	);
}

function ProgressionFields({
	habit,
	handleGoalTypeChange,
	handleInputChange
}: {
	habit: NewHabitWithoutUserId;
	handleGoalTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleInputChange: FieldProps["onChange"];
}) {
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
						onChange={handleInputChange}
					/>
					<S.RadioLabelText>
						<CheckboxIcon checked={habit.goal_type === "goal"} />
						with a detailed goal
					</S.RadioLabelText>
					<Containers.Row gap="small">
						<TargetField habit={habit} onChange={handleInputChange} />
						<UnitField habit={habit} onChange={handleInputChange} />
					</Containers.Row>
				</S.RadioOption>
			</S.RadioField>
		</S.ProgressionFieldset>
	);
}

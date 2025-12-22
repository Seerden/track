import { useHabitFormContext } from "@/components/habits/HabitForm/useHabitFormContext";
import { CheckboxIcon } from "@/components/utility/Checkbox/Checkbox";
import Containers from "@/lib/theme/components/container.style";
import { font } from "@/lib/theme/font";
import Input from "@/lib/theme/input";
import S from "./style/HabitForm.style";

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
            then extend this in HabitForm.style with 
            the width and font size */}
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

export default function ProgressionFields() {
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

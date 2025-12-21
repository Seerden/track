import Form from "@lib/theme/components/form.style";
import { useHabitFormContext } from "@/components/habits/HabitForm/useHabitFormContext";
import Input from "@/lib/theme/input";
import S from "./style/NewHabit.style";

export default function OccurrenceFields() {
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

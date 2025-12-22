import Form from "@lib/theme/components/form.style";
import {
	DatePickerInput,
	type DatePickerInputProps,
	type DateValue,
} from "@mantine/dates";
import { useHabitFormContext } from "@/components/habits/HabitForm/useHabitFormContext";
import { createDate } from "@/lib/datetime/make-date";
import S from "./style/HabitForm.style";

export default function DateFields() {
	const { habit, handleDateChange } = useHabitFormContext();

	function handleChange(
		value: DateValue,
		field: "start_timestamp" | "end_timestamp"
	) {
		handleDateChange({
			value: value ? createDate(value) : null,
			field,
		});
	}

	const start: DatePickerInputProps = {
		label: "Start date",
		name: "start_timestamp",
		required: true,
		value: habit.start_timestamp
			? createDate(habit.start_timestamp).toDate()
			: undefined,
		onChange: (value) => handleChange(value, "start_timestamp"),
	};

	const end: DatePickerInputProps = {
		label: "End date",
		name: "end_timestamp",
		minDate: start.value ?? undefined,
		value: habit.end_timestamp
			? createDate(habit.end_timestamp).toDate()
			: undefined,
		onChange: (value) => handleChange(value, "end_timestamp"),
	};

	return (
		<Form.Row
			style={{
				position: "relative",
				flexDirection: "column",
			}}
		>
			<S.DateFields>
				<DatePickerInput {...start} />
				<DatePickerInput {...end} />
			</S.DateFields>
		</Form.Row>
	);
}

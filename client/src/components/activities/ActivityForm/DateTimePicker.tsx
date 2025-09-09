import {
	DatePickerInput,
	type DatePickerInputProps,
	DateTimePicker as MantineDateTimePicker,
	type DateTimePickerProps as MantineDateTimePickerProps,
} from "@mantine/dates";
import type { OmitStrict } from "@shared/types/data/utility.types";
import { createDate } from "@/lib/datetime/make-date";
import F from "@/lib/theme/components/form.style";
import type useDateTimePicker from "./useDateTimePicker";

export default function DateTimePicker({
	allDay,
	dates,
	handleDateChange,
}: OmitStrict<ReturnType<typeof useDateTimePicker>, "handleAllDayChange">) {
	const InputComponent = allDay ? DatePickerInput : MantineDateTimePicker;
	// TODO: update to mantine 8 and use timePickerProps in here
	const inputProps = allDay
		? ({
				valueFormat: "DD MMMM YYYY",
			} satisfies DatePickerInputProps)
		: ({
				valueFormat: "DD MMMM YYYY (HH:mm)",
			} satisfies MantineDateTimePickerProps);

	return (
		<F.Row style={{ flexDirection: "column" }}>
			<InputComponent
				required
				error={createDate(dates.start).isAfter(createDate(dates.end))}
				label="Start"
				value={createDate(dates.start).toDate()}
				onChange={(value) => {
					handleDateChange({ field: "start", value });
				}}
				{...inputProps}
			/>

			<InputComponent
				required
				error={createDate(dates.end).isBefore(createDate(dates.start))}
				label="End"
				value={createDate(dates.end).toDate()}
				onChange={(value) => {
					handleDateChange({ field: "end", value });
				}}
				{...inputProps}
			/>
		</F.Row>
	);
}

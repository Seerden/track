import { Checkbox } from "@/components/utility/Checkbox/Checkbox";
import Input from "@/lib/theme/input";
import { LucideHelpCircle } from "lucide-react";
import type { DateTimePickerProps } from "./datetime-picker.types";
import S from "./style/DateTimePicker.style";
import useDateTimePicker from "./useDateTimePicker";

export default function DateTimePicker({ onChange, defaultValues }: DateTimePickerProps) {
	const {
		allDay,
		manualEndDate,
		defaultStartDate,
		defaultEndDate,
		defaultTime,
		onAllDayFieldChange,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onTimeFieldChange
	} = useDateTimePicker({
		onChange,
		defaultValues
	});

	return (
		<S.Form>
			<S.Row>
				<S.Fields>
					<S.Label>
						<span>Date</span>
						<Input.Default
							type="date"
							defaultValue={defaultStartDate}
							onChange={onStartDateFieldChange}
						/>
					</S.Label>

					<S.Label $faded={!manualEndDate}>
						<span>End date</span>
						<Input.Default
							type="date"
							defaultValue={defaultEndDate}
							onChange={onEndDateFieldChange}
						/>
					</S.Label>
					<S.Info
						title={
							"If you do not set an end date, it will default to the start date."
						}
					>
						<LucideHelpCircle size={20} />
					</S.Info>
				</S.Fields>
			</S.Row>
			<S.Row>
				<S.Fields>
					<S.Label $faded={allDay}>
						<span>Start time</span>
						<Input.Default
							type="text"
							onBlur={(e) => onTimeFieldChange(e, "start")}
							defaultValue={defaultTime.start}
							// TODO: Need something in the UI to clarify the time
							// format (also in the endTime field), just this
							// placeholder is not enough -- do this after implementing
							// parsing of other types of time inputs
							placeholder={"HHmm"}
							disabled={allDay}
						/>
					</S.Label>
					<S.Label $faded={allDay}>
						<span>End time</span>
						<Input.Default
							type="text"
							placeholder={"HHmm"}
							onBlur={(e) => onTimeFieldChange(e, "end")}
							defaultValue={defaultTime.end}
							disabled={allDay}
						/>
					</S.Label>
				</S.Fields>
				<S.AllDay>
					All day?
					<Checkbox checked={allDay} onChange={onAllDayFieldChange} />
				</S.AllDay>
			</S.Row>
		</S.Form>
	);
}

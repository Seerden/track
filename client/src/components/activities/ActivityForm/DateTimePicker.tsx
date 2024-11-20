import DefaultInput from "@/lib/theme/components/input/DefaultInput.style";
import { Checkbox } from "@lib/theme/components/Checkbox";
import { FaInfo } from "react-icons/fa";
import type { DateTimePickerProps } from "./datetime-picker.types";
import S from "./style/DateTimePicker.style";
import useDateTimePicker from "./useDateTimePicker";

export default function DateTimePicker({ setState, defaultValues }: DateTimePickerProps) {
	const {
		allDay,
		manualEndDate,
		defaultStartDate,
		date,
		defaultTime,
		onAllDayFieldChange,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onTimeFieldChange
	} = useDateTimePicker({
		setState,
		defaultValues
	});

	return (
		<S.Form>
			<S.Row>
				<S.Fields>
					<S.Label>
						<span>Date</span>
						<DefaultInput
							type="date"
							defaultValue={defaultStartDate}
							onChange={onStartDateFieldChange}
						/>
					</S.Label>

					<S.Label $faded={!manualEndDate}>
						<span>End date</span>
						<DefaultInput
							type="date"
							value={date.end}
							onChange={onEndDateFieldChange}
						/>
					</S.Label>
					<S.Info
						title={
							"If you do not set an end date, it will default to the start date."
						}
					>
						<FaInfo size={12} />
					</S.Info>
				</S.Fields>
			</S.Row>
			<S.Row>
				<S.Fields>
					<S.Label $faded={allDay}>
						<span>Start time</span>
						<DefaultInput
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
						<DefaultInput
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
					<S.Checkbox
						type="checkbox"
						checked={allDay}
						onChange={onAllDayFieldChange}
					/>
					<S.Icon>
						<Checkbox checked={allDay} />
					</S.Icon>
				</S.AllDay>
			</S.Row>
		</S.Form>
	);
}

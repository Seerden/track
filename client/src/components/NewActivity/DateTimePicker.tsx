import { FaInfo } from "react-icons/fa";
import { Checkbox } from "../../lib/theme/components/Checkbox";
import { DateTimePickerProps } from "./datetime-picker.types";
import * as S from "./DateTimePicker.style";
import useDateTimePicker from "./use-datetime-picker";

export default function DateTimePicker({ setState }: DateTimePickerProps) {
	const {
		allDay,
		manualEndDate,
		defaultStartDate,
		date,
		onStartDateChange,
		onEndDateChange,
		onAllDayChange,
		onTimeChange
	} = useDateTimePicker({
		setState
	});

	return (
		<S.Form>
			<S.Row>
				<S.Fields>
					<S.Label>
						<span>Date</span>
						<input
							type="date"
							value={date.start}
							defaultValue={defaultStartDate}
							onChange={onStartDateChange}
						/>
					</S.Label>

					<S.Label $faded={!manualEndDate}>
						<span>End date</span>
						<input type="date" value={date.end} onChange={onEndDateChange} />
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
						<input
							type="text"
							name="start-time"
							onChange={(e) => onTimeChange(e, "start")}
							placeholder={"HHmm"}
							disabled={allDay}
						/>
					</S.Label>
					<S.Label $faded={allDay}>
						<span>End time</span>
						<input
							type="text"
							name="end-time"
							placeholder={"HHmm"}
							onChange={(e) => onTimeChange(e, "end")}
							disabled={allDay}
						/>
					</S.Label>
				</S.Fields>
				<S.AllDay>
					All day?
					<S.Checkbox type="checkbox" checked={allDay} onChange={onAllDayChange} />
					<S.Icon>
						<Checkbox checked={allDay} />
					</S.Icon>
				</S.AllDay>
			</S.Row>
		</S.Form>
	);
}

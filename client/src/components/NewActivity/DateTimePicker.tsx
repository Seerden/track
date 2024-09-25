import type { DateTimePickerProps } from "./datetime-picker.types";
import * as S from "./DateTimePicker.style";
import useDateTimePicker from "./use-datetime-picker";

export function DateTimePicker({ setState }: DateTimePickerProps) {
	const { allDay, setAllDay, values, validEnd, onBlur } = useDateTimePicker({
		setState
	});

	return (
		<S.Form>
			<S.Label>
				All day?
				<input
					type="checkbox"
					checked={!!allDay}
					onChange={(e) => setAllDay(e.target.checked)}
				/>
			</S.Label>

			<S.Label>
				Start
				<input
					required
					type={allDay ? "date" : "datetime-local"}
					defaultValue={values.start}
					onBlur={(e) => onBlur(e, "start")}
				/>
			</S.Label>

			<div style={{ position: "relative" }}>
				<S.Label $showWarning={!validEnd}>
					End
					<input
						required
						type={allDay ? "date" : "datetime-local"}
						defaultValue={values.end}
						onBlur={(e) => onBlur(e, "end")}
					/>
				</S.Label>
				{!validEnd && <S.Warning>End must be after start.</S.Warning>}
			</div>
		</S.Form>
	);
}

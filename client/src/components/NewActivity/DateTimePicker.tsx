import type { DateTimeField } from "../../types/form.types";
import * as S from "./DateTimePicker.style";
import useDateTimePicker from "./use-datetime-picker";

type DateTimePickerProps = {
	setState: (args: { name: DateTimeField; value: string }) => void;
};

export function DateTimePicker({ setState }: DateTimePickerProps) {
	const { allDay, setAllDay, values, setValues, validEnd, startField, endField } =
		useDateTimePicker();

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
					onBlur={(e) => {
						// update local value -- we keep a local state for the
						// functionality of this component
						setValues((cur) => ({ ...cur, start: e.target.value }));
						// then update state value -- any checks that need to be done
						// should be done previous to this
						setState({ name: startField, value: e.target.value });
					}}
				/>
			</S.Label>

			<div style={{ position: "relative" }}>
				<S.Label $showWarning={!validEnd}>
					End
					<input
						required
						type={allDay ? "date" : "datetime-local"}
						defaultValue={values.end}
						onBlur={(e) => {
							setValues((cur) => ({ ...cur, end: e.target.value }));
							setState({ name: endField, value: e.target.value });
						}}
					/>
				</S.Label>
				{!validEnd && <S.Warning>End must be after start.</S.Warning>}
			</div>
		</S.Form>
	);
}

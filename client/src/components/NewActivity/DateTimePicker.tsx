import { useMemo, useState } from "react";
import * as S from "./DateTimePicker.style";

export function DateTimePicker() {
	const [allDay, setAllDay] = useState(false);

	type Values = {
		start: string;
		end: string;
	};

	const [values, setValues] = useState<Values>({
		start: "",
		end: ""
	});

	const validEnd = useMemo(() => {
		if (!values.start || !values.end) return true;
		return !!values.start && !!values.end && values.end >= values.start;
	}, [values]);

	return (
		<S.Form>
			<S.Label>
				All day
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
					onBlur={(e) => setValues((cur) => ({ ...cur, start: e.target.value }))}
				/>
			</S.Label>

			<div style={{ position: "relative" }}>
				<S.Label $showWarning={!validEnd}>
					End
					<input
						required
						type={allDay ? "date" : "datetime-local"}
						defaultValue={values.end}
						onBlur={(e) => setValues((cur) => ({ ...cur, end: e.target.value }))}
					/>
				</S.Label>
				{!validEnd && <S.Warning>End must be after start.</S.Warning>}
			</div>
		</S.Form>
	);
}

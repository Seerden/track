import { useMemo, useState } from "react";

export default function useDateTimePicker() {
	const [allDay, setAllDay] = useState(false);

	// TODO: when allDay changes, we have to clear out the values, because we
	// don't want to end up with a situation where start_date AND started_at are
	// both set to some value. Would rather only have one field present at a time
	// to prevent issues.

	// doesn't really have to be a memo
	const { startField, endField } = useMemo(() => {
		return {
			startField: allDay ? "start_date" : "started_at",
			endField: allDay ? "end_date" : "ended_at",
		} as const;
	}, [allDay]);

	type Values = {
		start: string;
		end: string;
	};

	const [values, setValues] = useState<Values>({
		start: "",
		end: "",
	});

	const validEnd = useMemo(() => {
		if (!values.start || !values.end) return true;
		return !!values.start && !!values.end && values.end >= values.start;
	}, [values]);

	return {
		startField,
		endField,
		validEnd,
		values,
		setValues,
		allDay,
		setAllDay,
	};
}

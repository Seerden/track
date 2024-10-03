import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import type { DateTimePickerProps } from "./datetime-picker.types";

export default function useDateTimePicker({ setState }: DateTimePickerProps) {
	const [allDay, setAllDay] = useState(false);

	// When allDay changes, we have to clear out the values, because we don't
	// want to end up with a situation where start_date AND started_at are
	// both set to some value. Would rather only have one field present at a time
	// to prevent issues.
	useEffect(() => {
		const unusedStartField = allDay ? "started_at" : "start_date";
		const unusedEndField = allDay ? "ended_at" : "end_date";

		setState({ name: unusedStartField, value: "" });
		setState({ name: unusedEndField, value: "" });
	}, [allDay]);

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
		// TODO: we also want to set these defaults when switching from allDay to
		// not allDay
		start: dayjs().format("YYYY-MM-DDTHH:mm"),
		end: dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
	});

	function onBlur(e: React.FocusEvent<HTMLInputElement>, field: "start" | "end") {
		// update local value -- we keep a local state for the
		// functionality of this component
		setValues((cur) => ({ ...cur, [field]: e.target.value }));
		// then update state value -- any checks that need to be done
		// should be done previous to this
		const stateField = field === "start" ? startField : endField;
		setState({ name: stateField, value: e.target.value });
	}

	const validEnd = useMemo(() => {
		if (!values.start || !values.end) return true;
		return !!values.start && !!values.end && values.end >= values.start;
	}, [values]);

	return {
		validEnd,
		values,
		allDay,
		setAllDay,
		onBlur,
	};
}

import { createDate, today } from "@lib/datetime/make-date";
import { parseTimeString } from "@lib/datetime/parse-string";
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

	const { startField, endField } = useMemo(() => {
		return {
			startField: allDay ? "start_date" : "started_at",
			endField: allDay ? "end_date" : "ended_at",
		} as const;
	}, [allDay]);

	const [manualEndDate, setManualEndDate] = useState(false);
	const defaultStartDate = today().format("YYYY-MM-DD");

	const [date, setDate] = useState({
		start: defaultStartDate,
		end: defaultStartDate,
	});

	const currentTime = today();
	const [time, setTime] = useState({
		start: currentTime.format("HHmm"),
		end: currentTime.add(1, "hour").format("HHmm"),
	});

	const dateTime = useMemo(() => {
		const [start, end] = [
			createDate(allDay ? date.start : `${date.start}T${time.start}`).toISOString(),
			createDate(allDay ? date.end : `${date.end}T${time.end}`).toISOString(),
		];

		return { start, end };
	}, [date, time, allDay]);

	useEffect(() => {
		setState({ name: startField, value: dateTime.start });
		setState({ name: endField, value: dateTime.end });
	}, [startField, endField, dateTime]);

	function handleDateChange(value: string, field: "start" | "end") {
		setDate((current) => ({
			...current,
			[field]: value,
		}));
	}

	function onStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
		handleDateChange(e.target.value, "start");
		if (!manualEndDate) {
			handleDateChange(e.target.value, "end");
		}
	}

	function onEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value) {
			handleDateChange(e.target.value, "end");
			setManualEndDate(true);
		} else {
			setManualEndDate(false);
			handleDateChange(date.start, "end");
			e.currentTarget.blur();
		}
	}

	function onAllDayChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAllDay(e.target.checked);
	}

	function onTimeChange(e: React.ChangeEvent<HTMLInputElement>, field: "start" | "end") {
		if (e.target.value.length !== 4) return; // TODO: this is very temporary

		setTime({
			...time,
			[field]: parseTimeString(e.target.value),
		});
	}

	return {
		allDay,
		setAllDay,
		manualEndDate,
		setManualEndDate,
		date,
		setDate,
		defaultStartDate,
		onStartDateChange,
		onEndDateChange,
		onAllDayChange,
		onTimeChange,
	};
}

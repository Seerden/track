import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import type { DateTimePickerProps } from "./datetime-picker.types";

function parseTimeString(time: string) {
	// turns e.g. 1230 into dayjs with time to 12:30pm
	// TODO: extend to also parse e.g. 14:30, 2:30pm, 2:30p, 2:30 p, 2:30 p.m., 2:30 p.m, 2:30pm
	return dayjs(time, "HHmm").format("HH:mm");
}

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
	const defaultStartDate = dayjs.utc().format("YYYY-MM-DD");

	const [date, setDate] = useState({
		start: defaultStartDate,
		end: defaultStartDate,
	});

	const currentTime = dayjs().utc().local();
	const [time, setTime] = useState({
		start: currentTime.format("HHmm"),
		end: currentTime.add(1, "hour").format("HHmm"),
	});

	const dateTime = useMemo(() => {
		const start = allDay ? date.start : `${date.start}T${time.start}`;
		const end = allDay ? date.end : `${date.end}T${time.end}`;

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

import { isToday } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import { selectedTimeWindowState } from "@/lib/state/selected-time-window-state";
import { createDate } from "@lib/datetime/make-date";
import { parseTimeString } from "@lib/datetime/parse-string";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import type { DateTimePickerProps } from "./datetime-picker.types";

export default function useDateTimePicker({ setState }: DateTimePickerProps) {
	const currentTime = useCurrentTime(); // the default interval on this might be too short, causing too many re-renders.
	const timeWindow = useRecoilValue(selectedTimeWindowState);
	const [manualEndDate, setManualEndDate] = useState(false);
	const [allDay, setAllDay] = useState(false);

	const dateFields = useMemo(() => {
		const start = allDay ? "start_date" : "started_at";
		const end = allDay ? "end_date" : "ended_at";
		const unusedStart = allDay ? "started_at" : "start_date";
		const unusedEnd = allDay ? "ended_at" : "end_date";
		return { start, end, unusedStart, unusedEnd } as const;
	}, [allDay]);

	const defaultStartDate = useMemo(() => {
		return timeWindow.startDate.format("YYYY-MM-DD");
	}, [timeWindow.startDate]);

	const [date, setDate] = useState({
		start: defaultStartDate,
		end: defaultStartDate
	});

	const [time, setTime] = useState({
		start: currentTime.format("HHmm"),
		end: currentTime.add(1, "hour").format("HHmm")
	});

	const defaultTime = useMemo(
		() => ({
			start: isToday(timeWindow.startDate) ? currentTime.format("HHmm") : "",
			end: isToday(timeWindow.startDate)
				? currentTime.add(1, "hour").format("HHmm")
				: ""
		}),
		[timeWindow.startDate, currentTime]
	);

	const dateTime = useMemo(
		() => ({
			start: createDate(allDay ? date.start : `${date.start}T${time.start}`),
			end: createDate(allDay ? date.end : `${date.end}T${time.end}`)
		}),
		[date, time, allDay]
	);

	// Clear out unused fields when allDay is toggled
	useEffect(() => {
		setState({ name: dateFields.unusedStart, value: "" });
		setState({ name: dateFields.unusedEnd, value: "" });
	}, [allDay]);

	useEffect(() => {
		setState({ name: dateFields.start, value: dateTime.start });
		setState({ name: dateFields.end, value: dateTime.end });
	}, [dateFields, dateTime]);

	function handleDateChange(value: string, field: "start" | "end") {
		setDate((current) => ({
			...current,
			[field]: value
		}));
	}

	function onStartDateFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
		handleDateChange(e.target.value, "start");
		if (!manualEndDate) {
			handleDateChange(e.target.value, "end");
		}
	}

	function onEndDateFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value) {
			handleDateChange(e.target.value, "end");
			setManualEndDate(true);
		} else {
			setManualEndDate(false);
			handleDateChange(date.start, "end");
			e.currentTarget.blur();
		}
	}

	const onAllDayFieldChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setAllDay(e.target.checked);
			setState({ name: dateFields.start, value: dateTime.start });
			setState({ name: dateFields.end, value: dateTime.end });
			setState({ name: dateFields.unusedStart, value: "" });
			setState({ name: dateFields.unusedEnd, value: "" });
		},
		[setState, dateTime, dateFields]
	);

	function onTimeFieldChange(
		e: React.ChangeEvent<HTMLInputElement>,
		field: "start" | "end"
	) {
		if (e.target.value.length !== 4) return; // TODO: this is very temporary

		setTime((current) => ({
			...current,
			[field]: parseTimeString(e.target.value)
		}));
	}

	return {
		defaultStartDate,
		defaultTime,
		allDay,
		setAllDay,
		manualEndDate,
		setManualEndDate,
		date,
		setDate,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onAllDayFieldChange,
		onTimeFieldChange
	};
}

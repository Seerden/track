import {
	extractActiveDateTimeValues,
	isAllDay
} from "@/components/activities/ActivityForm/datetime-picker-extract-defaults";
import { isToday, sameDay } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import { selectedTimeWindowState } from "@/lib/state/selected-time-window-state";
import { createDate } from "@lib/datetime/make-date";
import { parseTimeString } from "@lib/datetime/parse-string";
import type { Maybe } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import type { DateTimePickerProps } from "./datetime-picker.types";

type UseDateTimePickerDefaults = {
	activeDateTimeValues: Maybe<{ start: Dayjs; end: Dayjs }>;
};

function useDateTimePickerDefaults({ activeDateTimeValues }: UseDateTimePickerDefaults) {
	const timeWindow = useRecoilValue(selectedTimeWindowState);
	const currentTime = useCurrentTime(); // the default interval on this might be too short, causing too many re-renders.

	const defaultTime = useMemo(() => {
		return activeDateTimeValues
			? {
					start: activeDateTimeValues.start.format("HHmm"),
					end: activeDateTimeValues.end.format("HHmm")
				}
			: {
					start: isToday(timeWindow.startDate) ? currentTime.format("HHmm") : "",
					end: isToday(timeWindow.startDate)
						? currentTime.add(1, "hour").format("HHmm")
						: ""
				};
	}, [activeDateTimeValues, timeWindow.startDate, currentTime]);

	const defaultNewActivityDate = timeWindow.startDate.format("YYYY-MM-DD");

	const defaultManualEndDate = !activeDateTimeValues
		? false
		: !sameDay(activeDateTimeValues.start, activeDateTimeValues.end);

	return {
		defaultTime,
		defaultNewActivityDate,
		defaultManualEndDate
	};
}

export default function useDateTimePicker({
	setState,
	defaultValues
}: DateTimePickerProps) {
	const activeDateTimeValues = extractActiveDateTimeValues(defaultValues);
	const [allDay, setAllDay] = useState(isAllDay(defaultValues));

	const { defaultTime, defaultNewActivityDate, defaultManualEndDate } =
		useDateTimePickerDefaults({
			activeDateTimeValues
		});

	const [manualEndDate, setManualEndDate] = useState(defaultManualEndDate);

	const dateFields = useMemo(() => {
		const start = allDay ? "start_date" : "started_at";
		const end = allDay ? "end_date" : "ended_at";
		const unusedStart = allDay ? "started_at" : "start_date";
		const unusedEnd = allDay ? "ended_at" : "end_date";
		return { start, end, unusedStart, unusedEnd } as const;
	}, [allDay]);

	const [date, setDate] = useState({
		start: defaultNewActivityDate,
		end: defaultNewActivityDate
	});

	const [time, setTime] = useState(defaultTime);

	const dateTime = useMemo(
		() => ({
			start: createDate(allDay ? date.start : `${date.start}T${time.start}`),
			end: createDate(allDay ? date.end : `${date.end}T${time.end}`)
		}),
		[date, time, allDay]
	);

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

		const parsedValue = parseTimeString(e.target.value);

		if (!parsedValue) return;

		setTime((current) => ({
			...current,
			[field]: parsedValue
		}));
	}

	return {
		allDay,
		manualEndDate,
		defaultStartDate: activeDateTimeValues?.start.format("YYYY-MM-DD") ?? date.start,
		defaultEndDate: activeDateTimeValues?.end.format("YYYY-MM-DD") ?? date.end,
		defaultTime,
		onAllDayFieldChange,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onTimeFieldChange
	};
}

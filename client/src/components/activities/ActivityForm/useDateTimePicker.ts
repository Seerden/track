import {
	isAllDay,
	maybeGetDefaultStartAndEnd
} from "@/components/activities/ActivityForm/datetime-picker-extract-defaults";
import { designateDateFields } from "@/components/activities/ActivityForm/used-and-unused-date-fields";
import { isToday, sameDay } from "@/lib/datetime/compare";
import { formatToHHmm, formatToYearMonthDay } from "@/lib/datetime/format-date";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import { selectedTimeWindowState } from "@/lib/state/selected-time-window-state";
import { createDate } from "@lib/datetime/make-date";
import { parseTimeString } from "@lib/datetime/parse-string";
import type { Maybe, StartAndEnd } from "@shared/types/data/utility.types";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import type { DateTimePickerProps } from "./datetime-picker.types";

type UseDateTimePickerDefaults = {
	defaultStartAndEnd: Maybe<StartAndEnd>;
};

function useDateTimePickerDefaults({ defaultStartAndEnd }: UseDateTimePickerDefaults) {
	const timeWindow = useRecoilValue(selectedTimeWindowState);
	const currentTime = useCurrentTime(30 * 1000); // 30 second poll interval

	const defaultTime = useMemo(() => {
		return defaultStartAndEnd
			? {
					start: formatToHHmm(defaultStartAndEnd.start, false),
					end: formatToHHmm(defaultStartAndEnd.end, false)
				}
			: {
					start: isToday(timeWindow.startDate)
						? formatToHHmm(currentTime, false)
						: "",
					end: isToday(timeWindow.startDate)
						? formatToHHmm(currentTime.add(1, "hour"), false)
						: ""
				};
	}, [defaultStartAndEnd, timeWindow.startDate, currentTime]);

	const defaultNewActivityDate = formatToYearMonthDay(timeWindow.startDate);

	const defaultDate = useMemo(
		() => ({
			start: defaultNewActivityDate,
			end: defaultNewActivityDate
		}),
		[defaultNewActivityDate]
	);

	const defaultManualEndDate = defaultStartAndEnd
		? !sameDay(defaultStartAndEnd.start, defaultStartAndEnd.end)
		: false;

	return {
		defaultTime,
		defaultDate,
		defaultManualEndDate
	};
}

export default function useDateTimePicker({
	onChange,
	defaultValues
}: DateTimePickerProps) {
	const defaultStartAndEnd = maybeGetDefaultStartAndEnd(defaultValues);
	const { defaultTime, defaultDate, defaultManualEndDate } = useDateTimePickerDefaults({
		defaultStartAndEnd
	});
	const [allDay, setAllDay] = useState(isAllDay(defaultValues));
	const dateFields = useMemo(() => designateDateFields(allDay), [allDay]);
	const [manualEndDate, setManualEndDate] = useState(defaultManualEndDate);
	const [date, setDate] = useState(defaultDate);
	const [time, setTime] = useState(defaultTime);
	const dateTime = useMemo(
		() => ({
			start: createDate(allDay ? date.start : `${date.start}T${time.start}`),
			end: createDate(allDay ? date.end : `${date.end}T${time.end}`)
		}),
		[date, time, allDay]
	);

	useEffect(() => {
		onChange({ name: dateFields.start, value: dateTime.start });
		onChange({ name: dateFields.end, value: dateTime.end });
		onChange({ name: dateFields.unusedStart, value: null });
		onChange({ name: dateFields.unusedEnd, value: null });
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

	function onAllDayFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAllDay(e.target.checked);
	}

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

	const defaultStartDate = defaultStartAndEnd?.start
		? formatToYearMonthDay(defaultStartAndEnd.start)
		: date.start;

	const defaultEndDate = defaultStartAndEnd?.end
		? formatToYearMonthDay(defaultStartAndEnd.end)
		: date.end;

	console.log({
		date,
		defaultStartAndEnd
	});

	return {
		allDay,
		manualEndDate,
		defaultStartDate,
		defaultEndDate,
		defaultTime,
		onAllDayFieldChange,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onTimeFieldChange
	};
}

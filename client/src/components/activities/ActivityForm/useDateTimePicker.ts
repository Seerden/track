import {
	isAllDay,
	maybeGetDefaultStartAndEnd
} from "@/components/activities/ActivityForm/datetime-picker-extract-defaults";
import { designateDateFields } from "@/components/activities/ActivityForm/used-and-unused-date-fields";
import { isToday, sameDay } from "@/lib/datetime/compare";
import { formatToHHmm, formatToYearMonthDay } from "@/lib/datetime/format-date";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import { createDate } from "@lib/datetime/make-date";
import { parseTimeString } from "@lib/datetime/parse-string";
import type { Maybe, StartAndEnd } from "@shared/types/data/utility.types";
import { produce } from "immer";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import type { DateTimePickerProps } from "./datetime-picker.types";

type UseDateTimePickerDefaults = {
	defaultStartAndEnd: Maybe<StartAndEnd>;
};

function useDateTimePickerDefaults({ defaultStartAndEnd }: UseDateTimePickerDefaults) {
	const timeWindow = useAtomValue(timeWindowAtom);
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
	const [date, setDate] = useState(defaultDate);
	const [time, setTime] = useState(defaultTime);
	const [manualEndDate, setManualEndDate] = useState(defaultManualEndDate);

	const dateFields = useMemo(() => designateDateFields(allDay), [allDay]);
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
		setDate(
			produce((draft) => {
				draft[field] = value;
			})
		);
	}

	function onStartDateFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
		handleDateChange(e.target.value, "start");
		if (!manualEndDate) {
			handleDateChange(e.target.value, "end");
		}
	}

	function onEndDateFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
		handleDateChange(e.target.value ?? date.start, "end");
		setManualEndDate(!!e.target.value);
		if (!e.target.value) e.currentTarget.blur();
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

		setTime(
			produce((draft) => {
				draft[field] = parsedValue;
			})
		);
	}

	return {
		allDay,
		manualEndDate,
		defaultStartDate: defaultStartAndEnd?.start
			? formatToYearMonthDay(defaultStartAndEnd.start)
			: date.start,
		defaultEndDate: defaultStartAndEnd?.end
			? formatToYearMonthDay(defaultStartAndEnd.end)
			: date.end,
		defaultTime,
		onAllDayFieldChange,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onTimeFieldChange
	};
}

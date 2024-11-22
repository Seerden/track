import {
	isAllDay,
	maybeGetDefaultStartAndEnd
} from "@/components/activities/ActivityForm/datetime-picker-extract-defaults";
import { designateDateFields } from "@/components/activities/ActivityForm/used-and-unused-date-fields";
import { isToday, sameDay } from "@/lib/datetime/compare";
import useCurrentTime from "@/lib/hooks/useCurrentTime";
import { selectedTimeWindowState } from "@/lib/state/selected-time-window-state";
import { createDate } from "@lib/datetime/make-date";
import { parseTimeString } from "@lib/datetime/parse-string";
import type { Maybe } from "@t/data/utility.types";
import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import type { DateTimePickerProps } from "./datetime-picker.types";

type UseDateTimePickerDefaults = {
	defaultStartAndEnd: Maybe<{ start: Dayjs; end: Dayjs }>;
};

function useDateTimePickerDefaults({ defaultStartAndEnd }: UseDateTimePickerDefaults) {
	const timeWindow = useRecoilValue(selectedTimeWindowState);
	const currentTime = useCurrentTime(); // the default interval on this might be too short, causing too many re-renders.

	const defaultTime = useMemo(() => {
		return defaultStartAndEnd
			? {
					start: defaultStartAndEnd.start.format("HHmm"),
					end: defaultStartAndEnd.end.format("HHmm")
				}
			: {
					start: isToday(timeWindow.startDate) ? currentTime.format("HHmm") : "",
					end: isToday(timeWindow.startDate)
						? currentTime.add(1, "hour").format("HHmm")
						: ""
				};
	}, [defaultStartAndEnd, timeWindow.startDate, currentTime]);

	const defaultNewActivityDate = timeWindow.startDate.format("YYYY-MM-DD");

	const defaultDate = useMemo(
		() => ({
			start: defaultNewActivityDate,
			end: defaultNewActivityDate
		}),
		[defaultNewActivityDate]
	);

	const defaultManualEndDate = !defaultStartAndEnd
		? false
		: !sameDay(defaultStartAndEnd.start, defaultStartAndEnd.end);

	return {
		defaultTime,
		defaultDate,
		defaultManualEndDate
	};
}

export default function useDateTimePicker({
	setState,
	defaultValues
}: DateTimePickerProps) {
	const defaultStartAndEnd = maybeGetDefaultStartAndEnd(defaultValues);
	const [allDay, setAllDay] = useState(isAllDay(defaultValues));

	const { defaultTime, defaultDate, defaultManualEndDate } = useDateTimePickerDefaults({
		defaultStartAndEnd
	});

	const [manualEndDate, setManualEndDate] = useState(defaultManualEndDate);

	const dateFields = useMemo(() => designateDateFields(allDay), [allDay]);

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
		setState({ name: dateFields.start, value: dateTime.start });
		setState({ name: dateFields.end, value: dateTime.end });
		setState({ name: dateFields.unusedStart, value: null });
		setState({ name: dateFields.unusedEnd, value: null });
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

	return {
		allDay,
		manualEndDate,
		defaultStartDate: defaultStartAndEnd?.start.format("YYYY-MM-DD") ?? date.start,
		defaultEndDate: defaultStartAndEnd?.end.format("YYYY-MM-DD") ?? date.end,
		defaultTime,
		onAllDayFieldChange,
		onStartDateFieldChange,
		onEndDateFieldChange,
		onTimeFieldChange
	};
}

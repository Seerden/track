import type { DateValue } from "@mantine/dates";
import { withDatesBaseSchema } from "@shared/lib/schemas/activity";
import { produce } from "immer";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
import { createDate, now } from "@/lib/datetime/make-date";
import type { DateTimePickerProps } from "./datetime-picker.types";

/**
 * @TODO (TRK-144)
 * In this PR, I'm refactoring the date picker fields for NewHabit to use the
 * DatePicker from mantine. ActivityForm still uses this custom hook/component,
 * but I think I want to also switch this one over to use mantine as well. There
 * is some logic in this hook that I want to re-use for those components though,
 * like automatically shifting the end date to the start date if it's changed
 * and becomes overlapping, etc, so I'm keeping this hook here for now to
 * evaluate the future refactored implementation.
 */

/** functionality hook for DateTimePicker, which is the date and time picker
 * specifically for the ActivityForm component. */
export default function useDateTimePicker({
	activity,
	setActivity,
}: DateTimePickerProps) {
	const [allDay, setAllDay] = useState(
		() => withDatesBaseSchema.safeParse(activity).success
	);

	const dates = useMemo(() => {
		const start = createDate(
			activity?.start_date ?? activity?.started_at ?? now()
		);
		const end = createDate(
			activity?.end_date ?? activity?.ended_at ?? start.add(1, "hour")
		);

		return {
			start: start.toDate(),
			end: end.toDate(),
		};
	}, [activity]);

	const handleAllDayChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("handleAllDayChange", e.target.checked);
		const isAllDay = e.target.checked;
		setAllDay(isAllDay);

		// TODO: if not all day, on switching allDay, set hour and minute to
		// current hour and minute (start), and for end, add an hour
		setActivity(
			produce((draft) => {
				const start = isAllDay
					? createDate(dates.start).startOf("day")
					: createDate(dates.start)
							.set("hour", now().hour())
							.set("minute", now().minute());
				const end = isAllDay
					? createDate(dates.end).endOf("day")
					: createDate(dates.end)
							.set("hour", now().hour())
							.add(1, "hour")
							.set("minute", now().minute());
				draft.start_date = isAllDay ? start : null;
				draft.end_date = isAllDay ? end : null;
				draft.started_at = isAllDay ? null : start;
				draft.ended_at = isAllDay ? null : end;
			})
		);
	};

	const handleDateChange = useCallback(
		({ field, value }: { field: "start" | "end"; value: DateValue }) => {
			let newStart = value
				? createDate(field === "start" ? value : dates.start)
				: now();
			let newEnd = value
				? createDate(field === "end" ? value : dates.end)
				: newStart.add(1, "hour");

			switch (field) {
				case "start":
					if (newStart.isAfter(newEnd)) {
						newEnd = allDay ? newStart.endOf("day") : newStart.add(1, "hour");
					}
					if (allDay) {
						newStart = newStart.startOf("day");
					}
					break;
				case "end":
					// if end is before date.start, shift start to be the same
					// day
					// TODO: this is a bit buggy if called onChange, because usually
					// the input value will pass through e.g. 01:00 if you're typing
					// e.g. 18:30, which will shift the start time unintentionally.
					if (newEnd.isBefore(newStart, "day")) {
						newStart = allDay ? newEnd.startOf("day") : newEnd.add(-1, "hour");
					}
					if (allDay) {
						newEnd = newEnd.endOf("day");
					}
			}

			console.log({ newStart, newEnd });

			setActivity(
				produce((draft) => {
					draft.start_date = allDay ? newStart : null;
					draft.started_at = allDay ? null : newStart;
					draft.end_date = allDay ? newEnd : null;
					draft.ended_at = allDay ? null : newEnd;
				})
			);
		},
		[allDay, dates]
	);

	return {
		allDay,
		dates,
		handleAllDayChange,
		handleDateChange,
	};
}

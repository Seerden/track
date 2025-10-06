import { Popover } from "@mantine/core";
import dayjs from "@shared/lib/day";
import { isNullish } from "@shared/lib/is-nullish";
import type {
	HabitEntry,
	HabitWithPossiblySyntheticEntries,
} from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import type { Dayjs } from "dayjs";
import { type PropsWithChildren, useState } from "react";
import { buildCalendarRows } from "@/components/utility/Calendar/build-calendar-rows";
import type { Cell } from "@/components/utility/Calendar/calendar.types";
import { createDate, now } from "@/lib/datetime/make-date";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import Completion from "../Habits/Completion";
import { habitSuccessfulOnDate } from "../Habits/entry-is-completed";
import S from "./style/HabitCalendar.style";

function isCurrentYear(date: Datelike) {
	return createDate(date).year() === now().year();
}

/* TODO (TRK-93)
   - only show calendar entries between habit.start and habit.end. A habit
     that's not being tracked on a day shouldn't be visible on the calendar for
     that day.
*/

export default function HabitCalendar({
	date: initialDate,
	habit,
}: {
	date: Datelike;
	habit: HabitWithPossiblySyntheticEntries;
}) {
	const [date, setDate] = useState<Dayjs>(() => createDate(initialDate));
	const title = createDate(date).format(
		`MMMM ${isCurrentYear(date) ? "" : "YYYY"}`
	);

	const rows = buildCalendarRows(createDate(date));

	function changeMonth(direction: "previous" | "next") {
		setDate((cur) => {
			const offset = direction === "previous" ? -1 : 1;
			return cur.add(offset, "month").startOf("month").local();
		});
	}

	return (
		<>
			<S.CalendarHeader>
				<div style={{ display: "flex", gap: "0.5rem", flexDirection: "row" }}>
					<Buttons.Action.Direction
						direction="previous"
						onClick={() => changeMonth("previous")}
					/>
					<Buttons.Action.Direction
						direction="next"
						onClick={() => changeMonth("next")}
					/>
				</div>
				<span>{title}</span>
			</S.CalendarHeader>
			<Containers.Column gap="small">
				{rows.map((row, index) => (
					<Containers.Row
						gap="small"
						key={index}
						style={{ fontSize: "0.85rem" }}
					>
						{row.map((day, dayIndex) => {
							// TODO: inline return
							return (
								<HabitCell
									entries={habit.entries.filter(
										(entry) =>
											!isNullish(day.date) &&
											dayjs(entry.date as Dayjs)
												.local()
												.isSame(dayjs(day.date as Dayjs).local(), "day")
									)}
									// NOTE: we pass the whole habit, including the entries,
									// but we don't use habit.entries, because we filtered the
									// relevant subset for the `entries` prop already.
									habit={habit}
									key={dayIndex}
									day={day}
									buttonProps={{
										style: {
											borderRadius: "50%",
											fontSize: "0.8rem",
										},
										disabled: isNullish(day.value),
									}}
								/>
							);
						})}
					</Containers.Row>
				))}
			</Containers.Column>
		</>
	);
}

function HabitCell({
	day,
	entries,
	habit,
	buttonProps,
}: PropsWithChildren<{
	day: Cell;
	// buttonProps isn't really necessary. determine the props in here, we should
	// have all the information we need to make that happen
	buttonProps: Parameters<typeof Buttons.Cell.Habit>[0];
	habit: HabitWithPossiblySyntheticEntries;
	entries: HabitEntry[];
}>) {
	// TODO: we'll use this to determine the inner color of the cell.
	// The outer color of the cell is determined by the habit's settings (e.g.
	// for a weekly habit, all cells in a week will have the same
	// outer/background color.
	const cellDone = day.date
		? habitSuccessfulOnDate({ ...habit, entries }, createDate(day.date))
		: null;

	// TODO: implement this
	const rowDone = habit.interval_unit === "week" && true;
	// TODO: split up rowDone into weekDone and monthDone, applicable for weekly
	// and monthly habits, respectively.

	return (
		// TODO: expand Buttons.Cell.Default to Buttons.Cell.Habit, and pass some
		// things to it, like cellDone, rowDone, so we can style certain
		// properties together if need be (e.g. not just border color, but also
		// thickness, etc.)
		<Popover disabled={isNullish(day.value)}>
			<Popover.Target>
				<Buttons.Cell.Habit
					$cellDone={cellDone}
					$rowDone={rowDone}
					{...buttonProps}
					style={{
						outline: `2px solid transparent`,
						...buttonProps.style,
					}}
					type="button"
				>
					{day.value ?? ""}
				</Buttons.Cell.Habit>
			</Popover.Target>
			<Popover.Dropdown>
				<div>
					<Completion entries={entries} habit={habit} />
				</div>
			</Popover.Dropdown>
		</Popover>
	);
}

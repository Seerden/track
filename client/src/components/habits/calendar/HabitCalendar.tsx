import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "@shared/lib/day";
import { isNullish } from "@shared/lib/is-nullish";
import type {
	HabitWithPossiblySyntheticEntries,
	PossiblySyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { isSynthetic } from "@shared/types/data/habit-entry.guards";
import type { Nullable } from "@shared/types/data/utility.types";
import type { Dayjs } from "dayjs";
import { type PropsWithChildren, useState } from "react";
import { buildCalendarRows } from "@/components/utility/Calendar/build-calendar-rows";
import type { Cell } from "@/components/utility/Calendar/calendar.types";
import { createDate, now } from "@/lib/datetime/make-date";
import Buttons from "@/lib/theme/components/buttons";
import Containers from "@/lib/theme/components/container.style";
import { actionDropdownStyle } from "@/lib/theme/components/containers/popover.style";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import Completion from "../Habits/Completion";
import {
	habitSuccessfulInInterval,
	habitSuccessfulOnDate,
} from "../Habits/entry-is-completed";
import S from "./style/HabitCalendar.style";
import {
	realEntryThreshold,
	withSyntheticEntriesForDayCell,
} from "./synthetic";
import { habitTrackedOnDate } from "./habit-tracked-on-date";

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
				<Containers.Row gap="small">
					<Buttons.Action.Direction
						direction="previous"
						onClick={() => changeMonth("previous")}
					/>
					<Buttons.Action.Direction
						direction="next"
						onClick={() => changeMonth("next")}
					/>
				</Containers.Row>
				<span style={{ userSelect: "none" }}>{title}</span>
			</S.CalendarHeader>
			<Containers.Column
				gap="medium"
				style={{ width: "max-content", marginTop: spacingValue.small }}
			>
				{rows.map((row, index) => {
					const intervalDone =
						habit.interval_unit !== "day" &&
						row.some((day) => habitSuccessfulInInterval(habit, day.date));
					return (
						<Containers.Row
							gap="medium"
							key={index}
							style={{
								borderRadius: 5,
								fontSize: "0.85rem",
								backgroundColor: intervalDone ? "forestgreen" : "inherit",
							}}
						>
							{row.map((day, dayIndex) => {
								const entriesForDate = habit.entries.filter(
									(entry) =>
										!isNullish(day.date) &&
										dayjs(entry.date as Dayjs)
											.local()
											.isSame(dayjs(day.date as Dayjs).local(), "day")
								);

								// TODO: instead of disabling the button on nullish
								// `day`, or when `day` is outside of habit tracking
								// range, render an empty element

								if (
									isNullish(day.date) ||
									(!isNullish(day.date) && !habitTrackedOnDate(habit, day.date))
								)
									return (
										<div
											style={{
												width: 23,
												height: 23,
											}}
										/>
									);

								return (
									<HabitCell
										intervalDone={habitSuccessfulInInterval(habit, day.date)}
										entries={withSyntheticEntriesForDayCell(
											{ ...habit, entries: entriesForDate },
											day.date
										)}
										// NOTE: we pass the whole habit, including the entries,
										// but we don't use habit.entries, because we filtered the
										// relevant subset for the `entries` prop already.
										habit={habit}
										key={dayIndex}
										day={day}
									/>
								);
							})}
						</Containers.Row>
					);
				})}
			</Containers.Column>
		</>
	);
}

function HabitCell({
	day,
	entries,
	habit,
	intervalDone,
	buttonProps,
}: PropsWithChildren<{
	day: Cell;
	// buttonProps isn't really necessary. determine the props in here, we should
	// have all the information we need to make that happen
	buttonProps?: Parameters<typeof Buttons.Cell.Habit>[0];
	habit: HabitWithPossiblySyntheticEntries;
	intervalDone?: Nullable<boolean>;
	entries: PossiblySyntheticHabitEntry[];
}>) {
	// TODO: we'll use this to determine the inner color of the cell.
	// The outer color of the cell is determined by the habit's settings (e.g.
	// for a weekly habit, all cells in a week will have the same
	// outer/background color.

	const cellDone = day.date
		? habitSuccessfulOnDate({ ...habit, entries }, createDate(day.date))
		: null;

	// Since we do not have tri-state inputs yet for checkboxes
	// (true/false/null), a cell that was "touched" ("dirty", interacted with)
	// is one that is either a goal cell with a non-0 value, or a checkbox
	// with a true value. Since we always have at least 1 entry for every cell
	// (if not interacted with, it'll be a synthetic entry), we use cellTouched
	// to visually distinguish cells (days) that the user interacted with the
	// habit.
	const cellTouched =
		entries.filter(
			(entry) =>
				!isNullish(day.date) &&
				!isSynthetic(entry) &&
				createDate(entry.date).isSame(createDate(day.date), "date") &&
				!["0", null, "false"].includes(entry.value)
		)?.length > 0;

	// TODO: split up rowDone into weekDone and monthDone, applicable for weekly
	// and monthly habits, respectively.

	const [opened, { toggle }] = useDisclosure(false);

	return (
		// TODO: expand Buttons.Cell.Default to Buttons.Cell.Habit, and pass some
		// things to it, like cellDone, rowDone, so we can style certain
		// properties together if need be (e.g. not just border color, but also
		// thickness, etc.)
		<Popover
			withArrow
			arrowSize={6}
			arrowOffset={10}
			disabled={isNullish(day.value)}
			position="top-start"
			opened={opened}
			onChange={toggle}
			styles={{ dropdown: actionDropdownStyle }}
		>
			<Popover.Target>
				<Buttons.Cell.Habit
					onClick={toggle}
					$width={23}
					$height={23}
					$cellDone={cellDone}
					$cellTouched={cellTouched}
					$intervalDone={intervalDone}
					{...buttonProps}
					type="button"
				>
					{day.value ?? ""}
				</Buttons.Cell.Habit>
			</Popover.Target>
			<Popover.Dropdown>
				<Containers.Column gap="small">
					<S.CalendarTitle>
						{day.date ? createDate(day.date).format("MMMM D") : null}
					</S.CalendarTitle>
					<Completion
						entries={entries}
						habit={habit}
						count={
							day.date
								? realEntryThreshold(habit, createDate(day.date))
								: entries.length
						}
					/>
				</Containers.Column>
			</Popover.Dropdown>
		</Popover>
	);
}

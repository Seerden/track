import { isNullish } from "@shared/lib/is-nullish";
import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import type { Datelike } from "@shared/lib/schemas/timestamp";
import { createDate } from "@/lib/datetime/make-date";

// TODO: test. Test with different timezones too?
export function habitTrackedOnDate(
	habit: HabitWithPossiblySyntheticEntries,
	date: Datelike
) {
	const dateDayjs = createDate(date).local().startOf("day");
	return (
		!createDate(habit.start_timestamp)
			.local()
			.utc()
			.isAfter(dateDayjs, "date") &&
		(!isNullish(habit.end_timestamp)
			? !createDate(habit.end_timestamp)
					.local()
					.startOf("day")
					.isBefore(dateDayjs, "date")
			: true)
	);
}

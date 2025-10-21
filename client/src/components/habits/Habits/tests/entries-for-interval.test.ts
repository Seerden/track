import type { PossiblySyntheticHabitEntry } from "@shared/lib/schemas/habit";
import { extractEntriesForInterval } from "../entries-for-interval";

describe("extractEntriesForInterval", () => {
	it("returns no entries regardless of interval, if no entries provided", () => {
		expect(extractEntriesForInterval([], "day", "2025-01-01")).toEqual([]);
	});

	test.sequential("day interval", () => {
		const entries: PossiblySyntheticHabitEntry[] = [
			{
				habit_id: "1",
				date: "2025-01-01",
				index: 0,
				created_at: 1,
				habit_entry_id: "1",
				user_id: "1",
				value: "true",
			},
		];
		expect(extractEntriesForInterval(entries, "day", "2025-01-01")).toEqual(
			entries
		);
		expect(extractEntriesForInterval(entries, "day", "2025-01-02")).toEqual([]);
	});

	test.sequential("week interval", () => {
		const entries: PossiblySyntheticHabitEntry[] = [
			{
				habit_id: "1",
				date: "2025-01-01",
				index: 0,
				created_at: 1,
				habit_entry_id: "1",
				user_id: "1",
				value: "true",
			},
		];

		expect(extractEntriesForInterval(entries, "week", "2024-12-30")).toEqual(
			entries
		);
		// 2025-01-01 is a Wednesday, so the week starts on 2024-12-29
		const entryInPreviousWeek: PossiblySyntheticHabitEntry[] = [
			{
				habit_id: "1",
				date: "2024-12-28",
				index: 0,
				created_at: 1,
				habit_entry_id: "1",
				user_id: "1",
				value: "true",
			},
		];
		expect(
			extractEntriesForInterval(entryInPreviousWeek, "week", "2025-01-01")
		).toEqual([]);

		const entryInNextWeek: PossiblySyntheticHabitEntry[] = [
			{
				habit_id: "1",
				date: "2025-01-05", // Sunday of the same week
				index: 0,
				created_at: 1,
				habit_entry_id: "1",
				user_id: "1",
				value: "true",
			},
		];
		expect(
			extractEntriesForInterval(entryInNextWeek, "week", "2025-01-01")
		).toEqual(entryInNextWeek);
		const entryAfterNextWeek: PossiblySyntheticHabitEntry[] = [
			{
				habit_id: "1",
				date: "2025-01-06", // Monday of the next week
				index: 0,
				created_at: 1,
				habit_entry_id: "1",
				user_id: "1",
				value: "true",
			},
		];
		expect(
			extractEntriesForInterval(entryAfterNextWeek, "week", "2025-01-01")
		).toEqual([]);
	});
});

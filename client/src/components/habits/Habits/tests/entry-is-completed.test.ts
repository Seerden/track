import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import { habitEntryIsDone } from "@/components/habits/Habits/entry-is-completed";
import { now } from "@/lib/datetime/make-date";

const habit: HabitWithEntries = {
	habit_id: "1",
	created_at: new Date(),
	user_id: "1",
	name: "test habit",
	description: "test description",
	start_timestamp: 1,
	end_timestamp: 2,
	interval: 1,
	frequency: 1,
	interval_unit: "day",
	goal_type: "goal",
	goal_unit: "test unit",
	goal: 2,
	tag_ids: ["1"],
	entries: [
		{
			created_at: now(),
			date: now(),
			habit_entry_id: "1",
			habit_id: "1",
			index: 0,
			user_id: "1",
			value: "1",
		},
	],
};

describe("entry-is-completed", () => {
	it("should return false if the entry is synthetic", () => {
		const syntheticEntry: SyntheticHabitEntry = {
			habit_id: "1",
			date: 1,
			index: 1,
			created_at: 1,
			synthetic: true,
		};
		expect(habitEntryIsDone({ habit, entry: syntheticEntry })).toBe(false);
	});

	it("should return correct done value for 'goal' entry", () => {
		const entry: HabitEntry = {
			habit_id: "1",
			date: 1,
			index: 1,
			created_at: 1,
			habit_entry_id: "1",
			user_id: "1",
			value: "2",
		};
		expect(habitEntryIsDone({ habit, entry })).toBe(true);

		entry.value = "1";
		expect(habitEntryIsDone({ habit, entry })).toBe(false);
	});

	it("should return correct done value for 'checkbox' entry", () => {
		const checkboxHabit = structuredClone(habit);
		(checkboxHabit as HabitWithEntries).goal_type = "checkbox";
		const entry: HabitEntry = {
			habit_id: "1",
			date: 1,
			index: 1,
			created_at: 1,
			habit_entry_id: "1",
			user_id: "1",
			value: "true",
		};
		expect(habitEntryIsDone({ habit: checkboxHabit, entry })).toBe(true);

		entry.value = "false";
		expect(habitEntryIsDone({ habit: checkboxHabit, entry })).toBe(false);
	});
});

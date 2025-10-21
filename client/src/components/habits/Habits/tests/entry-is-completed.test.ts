import type {
	HabitEntry,
	HabitWithEntries,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";
import { expect } from "vitest";
import {
	habitSuccessfulInInterval,
	habitSuccessfulOnDate,
	singleHabitEntryIsDone,
} from "@/components/habits/Habits/entry-is-completed";
import { createDate, now } from "@/lib/datetime/make-date";

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
		expect(singleHabitEntryIsDone({ habit, entry: syntheticEntry })).toBe(
			false
		);
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
		expect(singleHabitEntryIsDone({ habit, entry })).toBe(true);

		entry.value = "1";
		expect(singleHabitEntryIsDone({ habit, entry })).toBe(false);
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
		expect(singleHabitEntryIsDone({ habit: checkboxHabit, entry })).toBe(true);

		entry.value = "false";
		expect(singleHabitEntryIsDone({ habit: checkboxHabit, entry })).toBe(false);
	});
});

describe("habitSuccessfulOnDate", () => {
	describe("daily habits", () => {
		describe("daily goal scheme", () => {
			const h: HabitWithEntries = {
				created_at: new Date(),
				description: null,
				frequency: 1,
				goal: null,
				goal_type: "checkbox",
				goal_unit: null,
				habit_id: "1",
				interval: 1,
				interval_unit: "day",
				name: "test",
				start_timestamp: new Date(),
				end_timestamp: null,
				tag_ids: [],
				user_id: "1",
				entries: [],
			};

			it("fails when no entries are given", () => {
				expect(habitSuccessfulOnDate(h, createDate("2025-01-01"))).toEqual(
					false
				);
			});

			it("fails when a goal entry with a falsy value is given", () => {
				h.entries = [
					{
						created_at: new Date(),
						date: "2025-01-01",
						habit_entry_id: "1",
						habit_id: "1",
						index: 0,
						user_id: "1",
						value: "false",
					},
				];
				expect(habitSuccessfulOnDate(h, createDate("2025-01-01"))).toEqual(
					false
				);
			});

			it("passes when a goal entry with a truthy value is given", () => {
				h.entries[0].value = "true";
				expect(habitSuccessfulOnDate(h, createDate("2025-01-01"))).toEqual(
					true
				);
				h.entries[1] = { ...h.entries[0], value: "false", index: 1 };
				expect(habitSuccessfulOnDate(h, createDate("2025-01-01"))).toEqual(
					true
				);
			});

			it("fails when the entries are not for the given date", () => {
				expect(habitSuccessfulOnDate(h, createDate("2024-01-01"))).toEqual(
					false
				);
			});
		});

		// describe 2x/day scheme

		// describe 1x/day goal scheme

		// describe >1x/day goal scheme
	});

	describe("weekly habits", () => {
		// TODO
		it("TODO", () => {
			expect(true).toBe(true);
		});
	});

	describe("monthly habits", () => {
		// TODO
		it("TODO", () => {
			expect(true).toBe(true);
		});
	});
});

describe.sequential("habitSuccessfulInInterval", () => {
	const h: HabitWithEntries = {
		created_at: new Date(),
		description: null,
		frequency: 1,
		goal: null,
		goal_type: "checkbox",
		goal_unit: null,
		habit_id: "1",
		interval: 1,
		interval_unit: "day",
		name: "test",
		start_timestamp: new Date(),
		end_timestamp: null,
		tag_ids: [],
		user_id: "1",
		entries: [],
	};
	// daily habit: true, false
	describe.sequential("daily habit", () => {
		test.sequential("checkbox habit", () => {
			const h: HabitWithEntries = {
				created_at: new Date(),
				description: null,
				frequency: 1,
				goal: null,
				goal_type: "checkbox",
				goal_unit: null,
				habit_id: "1",
				interval: 1,
				interval_unit: "day",
				name: "test",
				start_timestamp: new Date(),
				end_timestamp: null,
				tag_ids: [],
				user_id: "1",
				entries: [],
			};

			h.entries = [
				{
					created_at: new Date(),
					date: "2025-01-01",
					habit_entry_id: "1",
					habit_id: "1",
					index: 0,
					user_id: "1",
					value: "true",
				},
			];

			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(true);

			h.entries[0].value = "false";
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(
				false
			);
		});

		test.sequential("goal habit", () => {
			const h: HabitWithEntries = {
				created_at: new Date(),
				description: null,
				frequency: 1,
				goal: 2,
				goal_type: "goal",
				goal_unit: null,
				habit_id: "1",
				interval: 1,
				interval_unit: "day",
				name: "test",
				start_timestamp: new Date(),
				end_timestamp: null,
				tag_ids: [],
				user_id: "1",
				entries: [
					{
						created_at: new Date(),
						date: "2025-01-01",
						habit_entry_id: "1",
						habit_id: "1",
						index: 0,
						user_id: "1",
						value: "2",
					},
				],
			};

			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(true);

			// now the entry belongs to another date, so it will be false again
			h.entries[0].date = "2024-12-30";
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(
				false
			);
		});
	});

	// weekly habit: true straightforward and with partials, false
	// straightforward and with partials
	// NOTE: january 1, 2025 is a wednesday
	describe.sequential("weekly habit", () => {
		h.interval_unit = "week";
		h.frequency = 2;
		h.entries = [
			{
				created_at: new Date(),
				date: "2025-01-01",
				habit_entry_id: "1",
				habit_id: "1",
				index: 0,
				user_id: "1",
				value: "true",
			},
		];

		test.sequential("checkbox habit", () => {
			(h as HabitWithEntries).goal_type = "checkbox";
			(h as HabitWithEntries).goal = null;
			// with 1 entry, it's false (since frequency is 2)
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(
				false
			);
			h.entries.push({
				created_at: new Date(),
				// monday of the same week as january 1st, 2025
				date: "2024-12-30",
				habit_entry_id: "1",
				habit_id: "1",
				index: 0,
				user_id: "1",
				value: "true",
			});
			// with a second entry this week, it's successful
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(true);

			// but if the second entry falls on the previous week, it's false again
			h.entries[1].date = "2024-12-29";
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(
				false
			);
		});

		test.sequential("goal habit", () => {
			(h as HabitWithEntries).goal_type = "goal";
			(h as HabitWithEntries).goal = 2;

			h.entries[0].value = "2";
			h.entries[1].value = "0";
			h.entries[1].date = "2025-01-01";

			// only 1 entry is successful, but frequency is 2
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(
				false
			);

			// now 2 entries are successful
			h.entries[1].value = "2";
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(true);

			// with 1 entry now going to the next week, it fails again
			h.entries[1].date = "2025-02-01";
			expect(habitSuccessfulInInterval(h, createDate("2025-01-01"))).toBe(
				false
			);
		});
	});

	// monthly habit: true straightforward and with partials, false
	// straightforward (entry this month, entry last month, entry next month) and
	// with partials
});

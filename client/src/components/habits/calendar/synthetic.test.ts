import type { HabitWithPossiblySyntheticEntries } from "@shared/lib/schemas/habit";
import { createDate } from "@/lib/datetime/make-date";
import { realEntryThreshold } from "./synthetic";

describe.concurrent("HabitCalendar: synthetic entries", () => {
	describe.concurrent("realEntryThreshold", () => {
		test.sequential("goal habit", () => {
			const h: HabitWithPossiblySyntheticEntries = {
				habit_id: "1",
				created_at: new Date(),
				user_id: "1",
				name: "test habit",
				description: "test description",
				start_timestamp: new Date("2020-01-01"),
				end_timestamp: new Date("2030-01-01"),
				interval: 1,
				frequency: 1,
				interval_unit: "day",
				goal_type: "goal",
				goal: 2,
				goal_unit: "test unit",
				tag_ids: ["1"],
				entries: [],
			};

			describe.sequential("daily", () => {
				it("falls out of date range", () => {
					expect(realEntryThreshold(h, createDate("2050-01-01"))).toEqual(0);
				});
				it("needs 1 entry", () => {
					h.frequency = 1;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(1);
				});
				it("needs multiple entries", () => {
					h.frequency = 3;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(3);
				});
			});

			describe.sequential("weekly", () => {
				h.interval_unit = "week";
				it("falls out of date range", () => {
					expect(realEntryThreshold(h, createDate("2050-01-01"))).toEqual(0);
				});
				it("needs 1 entry", () => {
					h.frequency = 1;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(1);
				});
				it("needs 1 entry even if frequency is higher (e.g. 3x/week)", () => {
					h.frequency = 3;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(1);
				});
			});
		});
		test.sequential("checkbox habit", () => {
			const h: HabitWithPossiblySyntheticEntries = {
				habit_id: "1",
				created_at: new Date(),
				user_id: "1",
				name: "test habit",
				description: "test description",
				start_timestamp: new Date("2020-01-01"),
				end_timestamp: new Date("2030-01-01"),
				interval: 1,
				frequency: 1,
				interval_unit: "day",
				goal_type: "checkbox",
				goal: null,
				goal_unit: null,
				tag_ids: ["1"],
				entries: [],
			};

			describe.sequential("daily", () => {
				it("falls out of date range", () => {
					expect(realEntryThreshold(h, createDate("2050-01-01"))).toEqual(0);
				});
				it("requires 1 entry", () => {
					h.frequency = 1;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(1);
				});
				it("requires multiple entries", () => {
					h.frequency = 5;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(5);
				});
			});

			describe.sequential("weekly", () => {
				it("falls out of date range", () => {
					expect(realEntryThreshold(h, createDate("2050-01-01"))).toEqual(0);
				});
				it("requires 1 entry", () => {
					h.frequency = 1;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(1);
				});
				it("requires 1 entry even if frequency is higher (e.g. 3x/week)", () => {
					h.frequency = 3;
					expect(realEntryThreshold(h, createDate("2025-01-01"))).toEqual(1);
				});
			});
		});
	});

	describe("withSyntheticEntriesForDayCell", () => {
		// TODO
		test("TODO", () => {
			expect(true).toEqual(true);
		});
	});
});

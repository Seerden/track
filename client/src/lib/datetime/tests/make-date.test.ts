import { createDate, createFirstOfTheMonth, now, today } from "@/lib/datetime/make-date";
import type { Dayjs } from "dayjs";

describe("datetime/make-date", () => {
	describe("today", () => {
		it("should return the current date", () => {
			const result = today();
			expectTypeOf(result).toEqualTypeOf<Dayjs>();
		});
	});

	describe("now", () => {
		// Since now() does not return a fixed value, we cannot test it against
		// a known value.
		it("should return the current date and time", () => {
			const [first, second] = [now(), now()];

			expectTypeOf(first).toEqualTypeOf<Dayjs>();
			expect(first.isAfter(second)).toBe(false);
		});
	});

	describe("createDate", () => {
		it("should return a date object", () => {
			const date = createDate("2024-11-19T12:00:00");

			expect(date.isValid()).toBe(true);
		});
	});

	describe("createFirstOfMonth", () => {
		it("should return the first day of the month", () => {
			const result = createFirstOfTheMonth({ year: 2024, month: 11 });

			expect(result.startOf("month").isSame(result)).toBe(true);
			expect(result.day()).toBe(0);
			expect(result.add(-1, "day").month()).not.toBe(result.month());
		});
	});
});

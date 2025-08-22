import { isToday, sameDay } from "@/lib/datetime/compare";
import { createDate, now } from "@/lib/datetime/make-date";

describe("datetime/compare", () => {
	describe("sameDay", () => {
		it("should return true if two dates are the same day", () => {
			const one = new Date(2024, 11, 19);
			const two = new Date(2024, 11, 19);
			expect(sameDay(createDate(one), createDate(two))).toBe(true);
		});
		it("should return false if two dates are not the same day", () => {
			const one = new Date(2024, 11, 19);
			const two = new Date(2024, 11, 20);
			expect(sameDay(createDate(one), createDate(two))).toBe(false);

			const midnight = createDate(one).endOf("day");
			const minuteAfterMidnight = midnight.add(1, "millisecond");
			expect(sameDay(midnight, minuteAfterMidnight)).toBe(false);
		});
	});

	describe("isToday", () => {
		it("should return true if the date is today", () => {
			const currentTimeAndDate = now();

			expect(isToday(currentTimeAndDate)).toBe(true);

			expect(isToday(currentTimeAndDate.startOf("day"))).toBe(true);
		});

		it("should return false if the date is not today", () => {
			const yesterday = now().add(-1, "day");
			const currentTime = now();
			expect(isToday(yesterday)).toBe(false);
			expect(isToday(currentTime.endOf("day").add(1, "millisecond"))).toBe(
				false
			);
		});
	});
});

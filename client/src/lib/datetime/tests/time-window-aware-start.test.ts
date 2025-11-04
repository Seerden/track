import type { TimeWindow } from "@/types/time-window.types";
import { createDate, now } from "../make-date";
import { defaultTimeWindowAwareStart } from "../time-window-aware-start";

// NOTE: we don't test if e.g. 12:00 today leads to 12:00 today, because that's
// nearestNonPastHour functionality, which is tested when we test that function.
describe("defaultTimeWindowAwareStart", () => {
	test("if the time window starts today, it should return the nearest non-past hour from now", () => {
		const timeWindow = {
			intervalUnit: "day",
			startDate: now().startOf("day"),
			endDate: now().endOf("day"),
		} satisfies TimeWindow;
		const result = defaultTimeWindowAwareStart(timeWindow);
		// expect result to be within an hour from now
		expect(result.diff(now(), "hour")).toBeLessThanOrEqual(1);
	});

	test("if the time window starts in the future, it should return 12:00 on the start date", () => {
		const timeWindow = {
			intervalUnit: "day",
			startDate: createDate("2026-01-01").startOf("day"),
			endDate: createDate("2026-01-01").endOf("day"),
		} satisfies TimeWindow;
		vi.setSystemTime(new Date("2025-01-01"));
		const result = defaultTimeWindowAwareStart(timeWindow);
		expect(createDate(result).format("YYYY-MM-DD")).toBe("2026-01-01");
		expect(createDate(result).hour()).toBe(12);
	});
});

import { createDate } from "../make-date";
import { nearestNonPastHour } from "../nearest";

describe("nearestNonPastHour", () => {
	it("does not move to the next hour if we're at the first minute", () => {
		const date = createDate("2025-01-01 12:00:00");
		expect(nearestNonPastHour(date)).toEqual(date);
	});
	it("moves to the next hour if we're not at the first minute", () => {
		const date = createDate("2025-01-01 12:30:00");
		expect(nearestNonPastHour(date)).toEqual(createDate("2025-01-01 13:00:00"));
	});
});

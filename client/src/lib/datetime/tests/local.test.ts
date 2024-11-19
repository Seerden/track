import { getLocalHour } from "@/lib/datetime/local";
import { createDate } from "@/lib/datetime/make-date";

describe("datetime/local", () => {
	describe("getLocalHour", () => {
		it("should return the local hour of the date", () => {
			const date = createDate("2024-11-19T12:00:00");
			expect(getLocalHour(date)).toEqual(12);
		});
	});
});

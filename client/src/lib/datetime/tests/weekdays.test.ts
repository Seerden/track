import { daysOfWeekShort } from "@/lib/datetime/weekdays";

describe("datetime/weekdays", () => {
	it("should return an array of 7 strings", () => {
		const object = daysOfWeekShort;
		expectTypeOf(object).toEqualTypeOf<string[]>();
		expect(object).toHaveLength(7);
	});
});

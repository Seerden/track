import { currentFractionOfDay } from "@/lib/datetime/day-fraction";

describe("compare/day-fraction", () => {
	describe("currentFractionOfDay", () => {
		// Since this function only acts on the current time, we can't test it
		// against a fixed value.
		it("should return a sensible fraction", () => {
			const fraction = currentFractionOfDay();

			expectTypeOf(fraction).toEqualTypeOf<number>();
			expect(fraction).toBeGreaterThanOrEqual(0);
			expect(fraction).toBeLessThanOrEqual(1);
		});
	});
});

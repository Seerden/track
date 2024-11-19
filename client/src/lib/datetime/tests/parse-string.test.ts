import { parseTimeString } from "@/lib/datetime/parse-string";

describe("datetime/parse-string", () => {
	describe("parseTimeString", () => {
		it("should parse a correct 24-hour time string properly", () => {
			expect(parseTimeString("1230")).toEqual("12:30");
		});

		it("should return null when of bounds (i.e. before 0000 or after 2359)", () => {
			expect(parseTimeString("2520")).toBeNull();
			expect(parseTimeString("-0020")).toBeNull();
		});
	});
});

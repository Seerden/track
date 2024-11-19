import { formatDate, formatHour, formatToMonthAndYear } from "@/lib/datetime/format-date";
import { createDate } from "@/lib/datetime/make-date";

describe("compare/format-date", () => {
	describe("formatDate", () => {
		suite("should format a date to year-month-date hh:mm:ss", () => {
			const date = createDate("2024-11-19T12:00:00");
			it("should format `short`", () => {
				const formatted = formatDate(date, { short: true });
				expect(formatted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/);
				expect(formatted).toEqual("2024-11-19 12:00");
			});

			it("should format `long`", () => {
				const formatted = formatDate(date, { short: false });
				expect(formatted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
				expect(formatted).toEqual("2024-11-19 12:00:00");
			});
		});
	});

	describe("formatHour", () => {
		it("should format a number to HH:mm", () => {
			expect(formatHour(0)).toEqual("00:00");
			expect(formatHour(1)).toEqual("01:00");
			expect(formatHour(12)).toEqual("12:00");
			expect(formatHour(23)).toEqual("23:00");
		});

		it("should return empty string if index is out of range", () => {
			expect(formatHour(-1)).toEqual("");
			expect(formatHour(24)).toEqual("");
		});
	});

	describe("formatToMonthAndYear", () => {
		suite("should format a date to MMMM YYYY", () => {
			it("should format dayjs date", () => {
				const date = createDate("2024-11-19T12:00:00");
				expect(formatToMonthAndYear(date)).toEqual("November 2024");
			});

			it("should format unix timestamp", () => {
				expect(formatToMonthAndYear(createDate(0))).toEqual("January 1970");
			});
		});
	});
});

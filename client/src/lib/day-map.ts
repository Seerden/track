import type { DayOfWeek } from "@shared/types/data/utility.types";

export const dayMap: Map<number, DayOfWeek> = new Map([
	[0, "Sunday"],
	[1, "Monday"],
	[2, "Tuesday"],
	[3, "Wednesday"],
	[4, "Thursday"],
	[5, "Friday"],
	[6, "Saturday"],
]);

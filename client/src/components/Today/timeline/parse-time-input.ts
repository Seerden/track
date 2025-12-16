import { z } from "@shared/lib/zod";

const timeSchema = z
	.string()
	.regex(
		/^([01]\d|2[0-3]):([0-5]\d)$/,
		"Invalid time format. Expected HH:mm (24-hour)."
	);

export function parseTimeInput(value: string) {
	const [hour, minute] = timeSchema.parse(value).split(":");

	return { hour: +hour, minute: +minute };
}

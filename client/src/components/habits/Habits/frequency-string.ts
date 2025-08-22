import type { HabitWithEntries } from "@shared/lib/schemas/habit";

/**
 * Generates humanized string to display a habit's repetition settings, like "3
 * times per week", or "every 2 days", etc.
 */
export function frequencyString({
	frequency,
	interval,
	interval_unit,
	goal,
	goal_unit,
	goal_type,
}: HabitWithEntries) {
	const intervalSuffix = interval > 1 ? "s" : "";

	const frequencyLine =
		frequency === 1 ? (interval > 1 ? "once" : "") : `${frequency} times`; // outputs something like "once" or "3 times"

	const intervalLine = interval === 1 ? "every" : `per ${interval}`; // outputs something like "every" or "per 2"

	const humanized = `${frequencyLine} ${intervalLine} ${interval_unit}${intervalSuffix}`;

	let prefix = "";
	if (goal_type === "goal") {
		prefix = `${goal} ${goal_unit}, `; // outputs something like "12500 steps"
	}
	return prefix + humanized;
}

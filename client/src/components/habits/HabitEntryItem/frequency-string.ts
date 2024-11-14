import type { HabitWithIds } from "@/types/server/habit.types";

// TODO: docstring
export function frequencyString({
	frequency,
	interval,
	interval_unit,
	goal,
	goal_unit,
	goal_type
}: HabitWithIds) {
	let prefix = "";
	const intervalSuffix = interval > 1 ? "s" : "";
	const frequencyLine =
		frequency === 1 ? (interval > 1 ? "once" : "") : `${frequency} times`;
	const intervalLine = interval === 1 ? "every" : `per ${interval}`;
	const humanized = `${frequencyLine} ${intervalLine} ${interval_unit}${intervalSuffix}`;
	if (goal_type === "goal") {
		prefix = `${goal} ${goal_unit}, `;
	}
	return prefix + humanized;
}

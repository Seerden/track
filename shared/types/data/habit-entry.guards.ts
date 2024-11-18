import { HabitEntry, SyntheticHabitEntry } from "./habit.types";

export function isSynthetic(
	entry: HabitEntry | SyntheticHabitEntry,
): entry is SyntheticHabitEntry {
	return (entry as SyntheticHabitEntry).synthetic === true;
}

import type {
	HabitEntry,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";

export function isSynthetic(
	entry: HabitEntry | SyntheticHabitEntry
): entry is SyntheticHabitEntry {
	return (entry as SyntheticHabitEntry).synthetic === true;
}

import type {
	PossiblySyntheticHabitEntry,
	SyntheticHabitEntry,
} from "@shared/lib/schemas/habit";

export function isSynthetic(
	entry: PossiblySyntheticHabitEntry
): entry is SyntheticHabitEntry {
	return (entry as SyntheticHabitEntry).synthetic === true;
}

import type {
	HabitEntry,
	SyntheticHabitEntry
} from "@shared/lib/schemas/habit";

export type HabitEntryUpdateMutationArgs = {
	input: HabitEntry | SyntheticHabitEntry;
	value?: string;
};

export type HabitEntryUpdateMutationFunction = (
	args: HabitEntryUpdateMutationArgs
) => void;

import habitService from "@/lib/fetch/habit-service";
import { mk } from "@/lib/query-keys";
import type {
	HabitEntry,
	HabitEntryUpdateInput,
	SyntheticHabitEntry
} from "@shared/types/data/habit.types";
import { useMutation } from "@tanstack/react-query";

export type HabitEntryUpdateMutationArgs = {
	input: HabitEntry | SyntheticHabitEntry;
	value?: string;
};

export type HabitEntryUpdateMutationFunction = (
	args: HabitEntryUpdateMutationArgs
) => void;

export default function useMutateHabitEntry() {
	return useMutation<HabitEntry, unknown, HabitEntryUpdateInput>({
		async mutationFn(habitEntry) {
			return habitService.putEntry(habitEntry);
		},
		mutationKey: mk.habits.entries.update
	});
}

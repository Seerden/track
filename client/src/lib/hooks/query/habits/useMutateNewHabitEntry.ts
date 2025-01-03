import habitService from "@/lib/fetch/habit-service";
import { mk } from "@/lib/query-keys";
import type { HabitEntry, HabitEntryInput } from "@shared/types/data/habit.types";
import { useMutation } from "@tanstack/react-query";

export default function useMutateNewHabitEntry() {
	return useMutation<HabitEntry, unknown, HabitEntryInput>({
		async mutationFn({ habitEntry }) {
			return habitService.postEntry({ habitEntry });
		},
		mutationKey: mk.habits.entries.new
	});
}

import { getHabitEntries } from "@/lib/fetch/habit-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { HabitEntriesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryHabitEntries() {
	return useQuery<HabitEntriesData>({
		queryKey: qk.habits.entries,
		queryFn: getHabitEntries,
		...defaultQueryConfig
	});
}

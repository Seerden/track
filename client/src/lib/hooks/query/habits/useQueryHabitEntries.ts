import habitService from "@/lib/fetch/habit-service";
import transformByIdToMap from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useQueryHabitEntries() {
	return useQuery({
		queryKey: qk.habits.entries,
		queryFn: habitService.getEntriesByUser,
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}

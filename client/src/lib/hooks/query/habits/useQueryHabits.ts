import habitService from "@/lib/fetch/habit-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useQueryHabits() {
	return useQuery({
		queryKey: qk.habits.all,
		queryFn: habitService.getByUser,
		select,
		...defaultQueryConfig
	});
}

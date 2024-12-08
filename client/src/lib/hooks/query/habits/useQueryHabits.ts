import habitService from "@/lib/fetch/habit-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { HabitsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryHabits() {
	return useQuery<HabitsData>({
		queryKey: qk.habits.all,
		queryFn: habitService.getByUser,
		...defaultQueryConfig
	});
}

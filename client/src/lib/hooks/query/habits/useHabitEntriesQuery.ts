import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { HabitEntriesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getHabitEntries() {
	return api.get<HabitEntriesData>({ url: "/data/habit/entries" });
}

export default function useHabitEntriesQuery() {
	return useQuery<HabitEntriesData>({
		queryKey: qk.habits.entries,
		queryFn: getHabitEntries,
		...defaultQueryConfig
	});
}

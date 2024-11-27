import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { HabitsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getHabits() {
	return api.get<HabitsData>({ url: "/data/habits" });
}

export default function useHabitsQuery() {
	return useQuery<HabitsData>({
		queryKey: qk.habits.all,
		queryFn: getHabits,
		...defaultQueryConfig
	});
}

import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { HabitsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getHabits() {
	const url = makeAuthorizedUrl("/data/habits");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});

	return response.json();
}

export default function useHabitsQuery() {
	return useQuery<HabitsData>({
		queryKey: qk.habits.all,
		queryFn: getHabits,
		...defaultQueryConfig
	});
}

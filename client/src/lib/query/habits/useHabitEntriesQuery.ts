import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { defaultQueryConfig } from "@/lib/query-client";
import type { HabitEntriesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getHabitEntries() {
	const url = makeAuthorizedUrl("/data/habit/entries");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});
	return response.json();
}

export default function useHabitEntriesQuery() {
	return useQuery<HabitEntriesData>({
		queryKey: ["habit-entries"],
		queryFn: getHabitEntries,
		...defaultQueryConfig
	});
}

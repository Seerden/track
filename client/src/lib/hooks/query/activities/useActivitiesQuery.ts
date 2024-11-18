import { makeAuthorizedUrl } from "@/lib/fetch/make-authorized-url";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ActivitiesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getActivities() {
	const url = makeAuthorizedUrl("/data/activities");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET"
	});

	return response.json();
}

export default function useActivitiesQuery() {
	return useQuery<ActivitiesData>({
		queryKey: qk.activities.all,
		queryFn: getActivities,
		...defaultQueryConfig
	});
}

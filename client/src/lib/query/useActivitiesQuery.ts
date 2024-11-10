import type { ActivitiesData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";
import { makeAuthorizedUrl } from "../fetch/make-authorized-url";
import { defaultQueryConfig } from "../query-client";

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
		queryKey: ["activities"],
		queryFn: getActivities,
		...defaultQueryConfig
	});
}

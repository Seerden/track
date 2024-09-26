import { useQuery } from "@tanstack/react-query";
import type { Data } from "../types/query.types";
import type { ActivityWithIds } from "../types/server/activity.types";
import type { ById } from "../types/server/utility.types";
import { makeAuthorizedUrl } from "./fetch/make-authorized-url";
import { defaultQueryConfig } from "./query-client";

async function getActivities() {
	const url = makeAuthorizedUrl("/data/activities");
	const response = await fetch(url, {
		credentials: "include",
		method: "GET",
	});

	return response.json();
}

type ActivitiesData = Data<"activitiesById", ById<ActivityWithIds>>;

export default function useActivitiesQuery() {
	return useQuery<ActivitiesData>({
		queryKey: ["activities"],
		queryFn: getActivities,
		...defaultQueryConfig,
	});
}

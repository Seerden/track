import { useQuery } from "@tanstack/react-query";
import { Data } from "@type/query.types";
import { ActivityWithIds } from "@type/server/activity.types";
import { ById } from "@type/server/utility.types";
import { makeAuthorizedUrl } from "../fetch/make-authorized-url";
import { defaultQueryConfig } from "../query-client";

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

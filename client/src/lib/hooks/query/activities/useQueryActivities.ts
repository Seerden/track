import { createSyntheticActivitiesForTimeWindow } from "@/lib/recurrence";
import { syntheticActivitiesAtom } from "@/lib/state/synthetic-activity-state";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import { trpc } from "@/lib/trpc";
import { byIdAsList } from "@shared/lib/map";
import type { SyntheticActivity } from "@shared/lib/schemas/activity";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export function useQueryActivities() {
	const { data: recurrences } = useQuery(trpc.activities.recurrences.all.queryOptions());
	const timeWindow = useAtomValue(timeWindowAtom);
	// TODO: implement timeWindow filter on activities.all; make it optional
	// though. I think we probably want to still have an easily accessible query
	// that always returns every activity. Not sure how I want to implement it yet.
	const query = useQuery(
		trpc.activities.all.queryOptions({
			from: timeWindow.startDate,
			to: timeWindow.endDate
		})
	);
	const setSyntheticActivities = useSetAtom(syntheticActivitiesAtom);

	useEffect(() => {
		const activities = byIdAsList(query.data?.byId);
		// TODO: we could use the activities.recurring query instead to map over,
		// which would be slightly more efficient, but that would require proper
		// implementation of the query keys (resetting activities.all should also
		// reset activities.recurring, but I don't think the trpc wrapper does
		// that by default
		const syntheticActivities = activities.reduce((acc, cur) => {
			if (!recurrences || !cur.recurrence_id || !cur.will_recur) {
				return acc;
			}
			return acc.concat(
				createSyntheticActivitiesForTimeWindow({
					activity: cur,
					recurrence: recurrences[cur.recurrence_id],
					timeWindow
				})
			);
		}, [] as SyntheticActivity[]);

		setSyntheticActivities(syntheticActivities);
	}, [query.data?.byId, recurrences, timeWindow]);

	return query;
}

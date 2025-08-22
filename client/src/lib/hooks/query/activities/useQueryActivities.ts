import { createSyntheticActivitiesForTimeWindow } from "@/lib/recurrence";
import { syntheticActivitiesAtom } from "@/lib/state/synthetic-activity-state";
import { timeWindowAtom } from "@/lib/state/time-window.state";
import { trpc } from "@/lib/trpc";
import { byIdAsList } from "@shared/lib/map";
import type { SyntheticActivity } from "@shared/lib/schemas/activity";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

/** Query all activities that occur inside `timeWindow`. Has built-in
 * functionality to also fetch all recurring activities (regardless of timeWindow),
 * and sets syntheticActivities state for timeWindow properly accordingly.
 * @returns the regular activities.all query, which is timeWindow-filtered.
 * @todo optionally opt out of time-window filtering to get all activities. */
export function useQueryActivities() {
	const timeWindow = useAtomValue(timeWindowAtom);
	const setSyntheticActivities = useSetAtom(syntheticActivitiesAtom);
	const { data: recurrences } = useQuery(trpc.activities.recurrences.all.queryOptions());
	const { data: recurringActivitiesData } = useQuery(
		trpc.activities.recurring.queryOptions()
	);
	const query = useQuery(
		trpc.activities.all.queryOptions({
			from: timeWindow.startDate,
			to: timeWindow.endDate
		})
	);

	useEffect(() => {
		const recurringActivities = byIdAsList(recurringActivitiesData);
		// TODO: we could use the activities.recurring query instead to map over,
		// which would be slightly more efficient, but that would require proper
		// implementation of the query keys (resetting activities.all should also
		// reset activities.recurring, but I don't think the trpc wrapper does
		// that by default
		const syntheticActivities = recurringActivities.reduce((acc, cur) => {
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
	}, [recurringActivitiesData, recurrences, timeWindow]);

	return query;
}

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
	const query = useQuery(trpc.activities.all.queryOptions());
	const { data: recurrences } = useQuery(
		trpc.activities.recurrences.queryByUser.queryOptions()
	);
	const timeWindow = useAtomValue(timeWindowAtom);
	const setSyntheticActivities = useSetAtom(syntheticActivitiesAtom);

	useEffect(() => {
		const activities = byIdAsList(query.data?.byId);
		const syntheticActivities = activities
			.map((activity) => {
				if (!recurrences || !activity.recurrence_id) return null;
				return createSyntheticActivitiesForTimeWindow({
					activity,
					recurrence: recurrences[activity.recurrence_id],
					timeWindow
				});
			})
			.filter(Boolean)
			.flat() as Array<SyntheticActivity>;

		setSyntheticActivities(syntheticActivities);
	}, [query.data?.byId, recurrences, timeWindow]);

	return query;
}

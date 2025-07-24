import { AnimatedRoutes } from "@/components/wrappers/";
import { byIdAsList } from "@shared/lib/map";
import { useQuery } from "@tanstack/react-query";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { Suspense, useEffect } from "react";
import "./App.scss";
import { createSyntheticActivitiesForTimeWindow } from "./lib/recurrence";
import { timeWindowAtom } from "./lib/state/time-window.state";
import { trpc } from "./lib/trpc";

function App() {
	const { data: recurring } = useQuery(trpc.activities.recurring.queryOptions());
	const { data: recurrences } = useQuery(
		trpc.activities.recurrences.queryByUser.queryOptions()
	);
	const timeWindow = useAtomValue(timeWindowAtom);

	useEffect(() => {
		if (!recurring || !recurrences || !recurring?.byId) return;

		for (const activity of byIdAsList(recurring.byId)) {
			// TODO: useQueryRecurringActivities should return a list of activities
			// where recurrence_id is not null, by definition.
			if (activity.recurrence_id) {
				const synthetics = createSyntheticActivitiesForTimeWindow({
					activity,
					recurrence: recurrences[activity.recurrence_id],
					timeWindow
				});
				console.log({ synthetics });
			}
		}
	}, [recurring?.byId, recurrences, timeWindow]);

	return (
		<>
			<HeadContent />
			<Scripts />
			<Suspense fallback={<>Loading...</>}>
				<main>
					<AnimatedRoutes />
				</main>
			</Suspense>
		</>
	);
}

export default App;

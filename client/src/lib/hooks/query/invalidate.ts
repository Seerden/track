import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

/** Invalidate all activities and all recurrences.
 * @todo invalidate occurrences too, once they're implemented in the UI.
 */
export function invalidateActivities() {
	queryClient.invalidateQueries({
		queryKey: trpc.activities.q.all.queryKey(),
	});
	queryClient.invalidateQueries({
		queryKey: trpc.activities.q.recurring.queryKey(),
	});
	queryClient.invalidateQueries({
		queryKey: trpc.activities.q.recurrences.all.queryKey(),
	});
	queryClient.invalidateQueries({
		queryKey: trpc.activities.q.tasks.overdue.queryKey(),
	});
}

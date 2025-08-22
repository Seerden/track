import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";

/** Invalidate all activities and all recurrences.
 * @todo invalidate occurrences too, once they're implemented in the UI.
 */
export function invalidateActivities() {
	queryClient.invalidateQueries({
		queryKey: trpc.activities.all.queryKey(),
	});
	queryClient.invalidateQueries({
		queryKey: trpc.activities.recurring.queryKey(),
	});
	queryClient.invalidateQueries({
		queryKey: trpc.activities.recurrences.all.queryKey(),
	});
	queryClient.invalidateQueries({
		queryKey: trpc.activities.tasks.overdue.queryKey(),
	});
}

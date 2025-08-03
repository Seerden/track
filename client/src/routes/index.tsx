import Today from "@/components/Today/Today";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Today,
	// TODO TRK-246: remove this once the overdue task functionality is implemented
	loader: async () => {
		const overdue = await queryClient.ensureQueryData(
			trpc.activities.tasks.overdue.queryOptions()
		);

		console.log({ overdue });
	}
});

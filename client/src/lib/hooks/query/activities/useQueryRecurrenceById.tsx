import type { Nullable } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

export function useQueryRecurrenceById(recurrence_id: Nullable<string>) {
	return useQuery(
		trpc.activities.q.recurrences.queryById.queryOptions(
			{
				recurrence_ids: recurrence_id ? [recurrence_id] : [],
			},
			{
				select: (data) => {
					if (data.length) {
						return data[0];
					}
				},
			}
		)
	);
}

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

export function useQueryTags() {
	return useQuery(trpc.tags.q.all.queryOptions());
}

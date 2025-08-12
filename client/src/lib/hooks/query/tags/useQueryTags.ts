import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export function useQueryTags() {
	return useQuery(trpc.tags.all.queryOptions());
}

import { defaultQueryConfig } from "@/lib/query-client";
import type { QueryFunction, UseQueryResult } from "@tanstack/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

function useQueryWithDefaults<T extends QueryFunction>(
	queryKey: readonly string[],
	queryFn: T
): UseQueryResult<Awaited<ReturnType<T>>> {
	return useQuery(
		queryOptions({
			queryKey,
			queryFn: queryFn,
			...defaultQueryConfig
		})
	);
}

export default useQueryWithDefaults;

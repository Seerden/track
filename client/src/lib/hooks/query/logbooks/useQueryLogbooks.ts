import logbookService from "@/lib/fetch/logbook-service";
import transformByIdToMap from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { Logbook } from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLogbooks() {
	return useQuery({
		queryKey: qk.logbooks.all,
		queryFn: logbookService.logbooks.getByUser,
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}

export function useQueryLogbookById(logbook_id: ID) {
	return useQuery<Nullable<Logbook>>({
		queryKey: qk.logbooks.byId(logbook_id),
		queryFn: () => logbookService.logbooks.getById(logbook_id),
		...defaultQueryConfig
	});
}

import logbookService from "@/lib/fetch/logbook-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { Logbook } from "@shared/types/data/logbook.types";
import type { ID, Nullable } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLogbooks() {
	return useQuery({
		queryKey: qk.logbooks.all,
		queryFn: logbookService.logbooks.getByUser,
		select,
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

import logbookService from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogbooksData } from "@/types/data.types";
import type { Logbook } from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLogbooks() {
	return useQuery<LogbooksData>({
		queryKey: qk.logbooks.all,
		queryFn: logbookService.logbooks.getByUser,
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

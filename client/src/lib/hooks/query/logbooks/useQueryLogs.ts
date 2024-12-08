import logbookService from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogsData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLogs() {
	return useQuery<LogsData>({
		queryKey: qk.logs.all,
		queryFn: logbookService.logs.getByUser,
		...defaultQueryConfig
	});
}

export function useQueryLogsByLogbook(logbook_id: ID) {
	// TODO: I don't know if LogsData makes sense here. Do we not want to include the logbook_id in the response?
	return useQuery<LogsData>({
		queryKey: qk.logs.byLogbook(logbook_id),
		queryFn: () => logbookService.logs.getByLogbook(logbook_id),
		...defaultQueryConfig
	});
}

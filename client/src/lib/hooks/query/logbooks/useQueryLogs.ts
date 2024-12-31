import logbookService from "@/lib/fetch/logbook-service";
import transformByIdToMap from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLogs() {
	return useQuery({
		queryKey: qk.logs.all,
		queryFn: logbookService.logs.getByUser,
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}

// TODO: I don't know if LogsData makes sense here. Do we not want to include the logbook_id in the response?
export function useQueryLogsByLogbook(logbook_id: ID) {
	return useQuery({
		queryKey: qk.logs.byLogbook(logbook_id),
		queryFn: () => logbookService.logs.getByLogbook(logbook_id),
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}

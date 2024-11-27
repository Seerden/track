import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogsData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

async function getLogs() {
	return api.get<LogsData>({ url: "/data/logbooks/logs" });
}

export default function useQueryLogs() {
	return useQuery<LogsData>({
		queryKey: qk.logs.all,
		queryFn: getLogs,
		...defaultQueryConfig
	});
}

async function getLogsByLogbook(logbook_id: ID) {
	return api.get<LogsData>({ url: `/data/logbook/${logbook_id}/logs` });
}

export function useQueryLogsByLogbook(logbook_id: ID) {
	// TODO: I don't know if LogsData makes sense here. Do we not want to include the logbook_id in the response?
	return useQuery<LogsData>({
		queryKey: qk.logs.byLogbook(logbook_id),
		queryFn: () => getLogsByLogbook(logbook_id),
		...defaultQueryConfig
	});
}

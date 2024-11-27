import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogbooksData } from "@/types/data.types";
import type { Logbook } from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

async function getLogbooks() {
	return api.get<LogbooksData>({ url: "/data/logbooks" });
}

export default function useQueryLogbooks() {
	return useQuery<LogbooksData>({
		queryKey: qk.logbooks.all,
		queryFn: getLogbooks,
		...defaultQueryConfig
	});
}

async function getLogbookById(logbook_id: ID) {
	return api.get<Nullable<Logbook>>({ url: `/data/logbooks/${logbook_id}` });
}

export function useQueryLogbookById(logbook_id: ID) {
	return useQuery<Nullable<Logbook>>({
		queryKey: qk.logbooks.byId(logbook_id),
		queryFn: () => getLogbookById(logbook_id),
		...defaultQueryConfig
	});
}

import { getLogTemplates, getLogTemplatesByLogbook } from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogTemplatesData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryLogTemplates() {
	return useQuery<LogTemplatesData>({
		queryKey: qk.logTemplates.all,
		queryFn: getLogTemplates,
		...defaultQueryConfig
	});
}

export function useQueryLogTemplatesByLogbook(logbook_id: ID) {
	// TODO: does LogTemplatesData make sense, or do we want to include
	// logbook_id in the response?
	return useQuery<LogTemplatesData>({
		queryKey: qk.logTemplates.byLogbook(logbook_id),
		queryFn: () => getLogTemplatesByLogbook(logbook_id),
		...defaultQueryConfig
	});
}

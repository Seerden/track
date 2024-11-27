import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogTemplatesData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

async function getLogTemplates() {
	return api.get<LogTemplatesData>({ url: "/data/logbook/templates" });
}

export default function useQueryLogTemplates() {
	return useQuery<LogTemplatesData>({
		queryKey: qk.logTemplates.all,
		queryFn: getLogTemplates,
		...defaultQueryConfig
	});
}

async function getLogTemplatesByLogbook(logbook_id: ID) {
	return api.get<LogTemplatesData>({ url: `/data/logbook/${logbook_id}/templates` });
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

import logbookService from "@/lib/fetch/logbook-service";
import transformByIdToMap from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { LogTemplate } from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export function useQueryLogTemplate(log_template_id: ID) {
	return useQuery<Nullable<LogTemplate>>({
		queryKey: qk.logTemplates.byId(log_template_id),
		queryFn: () => logbookService.logTemplates.getById(log_template_id),
		...defaultQueryConfig
	});
}

/** TODO: this is unused currently. */
export default function useQueryLogTemplates() {
	return useQuery({
		queryKey: qk.logTemplates.all,
		queryFn: logbookService.logTemplates.getByUser,
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}

export function useQueryLogTemplatesByLogbook(logbook_id: ID) {
	// TODO: does LogTemplatesData make sense, or do we want to include
	// logbook_id in the response?
	return useQuery({
		queryKey: qk.logTemplates.byLogbook(logbook_id),
		queryFn: () => logbookService.logTemplates.getByLogbook(logbook_id),
		select(data) {
			return transformByIdToMap(data);
		},
		...defaultQueryConfig
	});
}

import logbookService from "@/lib/fetch/logbook-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ID } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export function useQueryItemTemplatesByLogbook(logbook_id: ID) {
	// TODO: does ItemTemplatesData make sense the way it is structured? Do we
	// not want to include the logbook_id in the response?
	return useQuery({
		queryKey: qk.itemTemplates.byLogbook(logbook_id),
		queryFn: () => logbookService.itemTemplates.getByLogbook(logbook_id),
		select,
		...defaultQueryConfig
	});
}

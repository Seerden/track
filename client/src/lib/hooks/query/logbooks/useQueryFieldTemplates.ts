import logbookService from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ID } from "@shared/types/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export function useQueryFieldTemplatesByItemTemplate({
	item_template_id
}: {
	item_template_id: ID;
}) {
	return useQuery({
		queryKey: qk.fields.templates.byItemTemplate(item_template_id),
		queryFn: () => logbookService.fieldTemplates.getByItemTemplate(item_template_id),
		...defaultQueryConfig
	});
}

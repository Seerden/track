import logbookService from "@/lib/fetch/logbook-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export function useQueryItemsByItemTemplate(item_template_id: ID) {
	return useQuery({
		queryKey: qk.items.byTemplate(item_template_id),
		queryFn: () => logbookService.items.getByTemplate(item_template_id),
		select,
		...defaultQueryConfig
	});
}

// TODO: this is unused right now. Should it be removed or can we use it, maybe
// in LogDetail somewhere?
export function useQueryItemsByLogbook(logbook_id: ID) {
	return useQuery({
		queryKey: qk.items.byLogbook(logbook_id),
		queryFn: () => logbookService.items.getByLogbook(logbook_id),
		select,
		...defaultQueryConfig
	});
}

// TODO: this is also unused currently.
export default function useQueryItems() {
	return useQuery({
		queryKey: qk.items.all,
		queryFn: logbookService.items.getByUser,
		select,
		...defaultQueryConfig
	});
}

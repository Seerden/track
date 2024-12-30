import logbookService from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ItemsData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export function useQueryItemsByItemTemplate(item_template_id: ID) {
	return useQuery<ItemsData>({
		queryKey: qk.items.byTemplate(item_template_id),
		queryFn: () => logbookService.items.getByTemplate(item_template_id),
		...defaultQueryConfig
	});
}

export function useQueryItemsByLogbook(logbook_id: ID) {
	return useQuery<ItemsData>({
		queryKey: qk.items.byLogbook(logbook_id),
		queryFn: () => logbookService.items.getByLogbook(logbook_id),
		...defaultQueryConfig
	});
}

export default function useQueryItems() {
	return useQuery<ItemsData>({
		queryKey: qk.items.all,
		queryFn: logbookService.items.getByUser,
		...defaultQueryConfig
	});
}

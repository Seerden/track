import logbookService from "@/lib/fetch/logbook-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryFields() {
	return useQuery({
		queryKey: qk.fields.all,
		queryFn: logbookService.fields.getByUser,
		select,
		...defaultQueryConfig
	});
}

export function useQueryFieldsByItemRow({ item_row_id }: { item_row_id: ID }) {
	return useQuery({
		queryKey: qk.fields.byItemRow(item_row_id),
		queryFn: () => logbookService.fields.getByItemRow({ item_row_id }),
		...defaultQueryConfig
	});
}

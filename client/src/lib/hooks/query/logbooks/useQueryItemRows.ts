import logbookService from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ItemRowsData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryItemRows() {
	return useQuery<ItemRowsData>({
		queryKey: qk.items.rows.all,
		queryFn: logbookService.itemRows.getByUser,
		...defaultQueryConfig
	});
}

export function useQueryItemRowsByLog({ log_id }: { log_id: ID }) {
	return useQuery<ItemRowsData>({
		queryKey: qk.items.rows.byLog(log_id),
		queryFn: () => logbookService.itemRows.getByLog(log_id),
		...defaultQueryConfig
	});
}

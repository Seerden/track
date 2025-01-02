import logbookService from "@/lib/fetch/logbook-service";
import { select } from "@/lib/hooks/query/select-map-by-id";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";

import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

// TODO: this is currently unused.
export default function useQueryItemRows() {
	return useQuery({
		queryKey: qk.items.rows.all,
		queryFn: logbookService.itemRows.getByUser,
		select,
		...defaultQueryConfig
	});
}

export function useQueryItemRowsByLog({ log_id }: { log_id: ID }) {
	return useQuery({
		queryKey: qk.items.rows.byLog(log_id),
		queryFn: () => logbookService.itemRows.getByLog(log_id),
		select,
		...defaultQueryConfig
	});
}

/** This query gets the item rows for the given log/item combination. */
export function useQueryItemRowsByLogItem({
	log_id,
	item_id
}: {
	log_id: ID;
	item_id: ID;
}) {
	return useQuery({
		queryKey: qk.items.rows.byLogItem({ log_id, item_id }),
		queryFn: () => logbookService.itemRows.getByLogItem({ log_id, item_id }),
		select,
		...defaultQueryConfig
	});
}

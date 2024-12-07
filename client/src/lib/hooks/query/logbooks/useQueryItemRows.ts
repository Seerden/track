import { getItemRows } from "@/lib/fetch/logbook-service";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ItemRowsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryItemRows() {
	return useQuery<ItemRowsData>({
		queryKey: qk.items.rows.all,
		queryFn: getItemRows,
		...defaultQueryConfig
	});
}

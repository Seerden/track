import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ItemRowsData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";

async function getItemRows() {
	return api.get<ItemRowsData>({ url: "/data/logbooks/items/rows" });
}

export default function useQueryItemRows() {
	return useQuery<ItemRowsData>({
		queryKey: qk.items.rows.all,
		queryFn: getItemRows,
		...defaultQueryConfig
	});
}

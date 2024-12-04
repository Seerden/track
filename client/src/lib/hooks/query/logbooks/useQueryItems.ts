import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ItemsData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

async function getItemsByLogbook(logbook_id: ID) {
	return api.get<ItemsData>({ url: `/data/logbook/${logbook_id}/items` });
}

export function useQueryItemsByLogbook(logbook_id: ID) {
	return useQuery<ItemsData>({
		queryKey: qk.items.byLogbook(logbook_id),
		queryFn: () => getItemsByLogbook(logbook_id),
		...defaultQueryConfig
	});
}

async function getItems() {
	return api.get<ItemsData>({ url: "/data/logbooks/items" });
}

export default function useQueryItems() {
	return useQuery<ItemsData>({
		queryKey: qk.items.all,
		queryFn: getItems,
		...defaultQueryConfig
	});
}

import { useQueryItemRowsByLogItem } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import type { ID } from "@t/data/utility.types";

/** Functionality hook for ItemSection */
export default function useItemSection({ item_id, log_id }: { item_id: ID; log_id: ID }) {
	const { data: itemRowsData } = useQueryItemRowsByLogItem({ item_id, log_id });

	const isProbablySuspended = !itemRowsData;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const itemRows = byIdAsList(itemRowsData.byId);

	return {
		isProbablySuspended,
		itemRows
	};
}

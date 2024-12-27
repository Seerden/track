import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemsByItemTemplate } from "@/lib/hooks/query/logbooks/useQueryItems";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";

export default function useLogDetailSectionData({
	log_id,
	item_template_id
}: {
	log_id: ID;
	item_template_id: ID;
}) {
	const { data: itemRowsData } = useQueryItemRowsByLog({ log_id });
	const { data: itemsData } = useQueryItemsByItemTemplate(item_template_id);
	const { data: logsData } = useQueryLogs();

	const isProbablySuspended = !itemRowsData || !itemsData || !logsData;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const itemRows = itemRowsData.byId ? Object.values(itemRowsData.byId) : [];
	const itemsById = itemsData.byId;
	const items = itemsById ? Object.values(itemsById) : [];
	const log = logsData.byId[log_id] as Maybe<Log>;

	return {
		isProbablySuspended,
		itemRows,
		items,
		log
	};
}

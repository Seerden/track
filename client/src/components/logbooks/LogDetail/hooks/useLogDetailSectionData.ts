import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemsByItemTemplate } from "@/lib/hooks/query/logbooks/useQueryItems";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";

type UseLogDetailSectionDataArgs = {
	log_id: ID;
	item_template_id: ID;
};

/** Helper hook for LogDetailSection that interacts with the necessary query
 * hooks to get all the data the component needs. */
export default function useLogDetailSectionData({
	log_id,
	item_template_id
}: UseLogDetailSectionDataArgs) {
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
	const items = itemsData?.byId ? Object.values(itemsData.byId) : [];
	const log = logsData.byId[log_id] as Maybe<Log>;

	return {
		isProbablySuspended,
		itemRows,
		items,
		log
	};
}

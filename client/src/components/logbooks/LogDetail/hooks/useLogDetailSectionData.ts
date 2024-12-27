import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemsByItemTemplate } from "@/lib/hooks/query/logbooks/useQueryItems";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import { useQueryLogTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";

export default function useLogDetailSectionData({
	logbook_id,
	log_id,
	item_template_id
}: {
	logbook_id: ID;
	log_id: ID;
	item_template_id: ID;
}) {
	const { data: itemRowsData } = useQueryItemRowsByLog({ log_id });
	const { data: itemsData } = useQueryItemsByItemTemplate(item_template_id);
	const { data: logTemplatesData } = useQueryLogTemplatesByLogbook(logbook_id);
	const { data: logsData } = useQueryLogs();

	const isProbablySuspended =
		!itemRowsData || !itemsData || !logTemplatesData || !logsData;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const itemRows = itemRowsData.byId ? Object.values(itemRowsData.byId) : [];
	const itemsById = itemsData.byId;
	const items = itemsById ? Object.values(itemsById) : [];
	const log = logsData.byId[log_id] as Maybe<Log>;
	const logTemplate = log?.log_template_id
		? logTemplatesData?.byId[log.log_template_id]
		: null;

	const layout = logTemplate?.layout;

	return {
		isProbablySuspended,
		itemRows,
		items,
		layout
	};
}

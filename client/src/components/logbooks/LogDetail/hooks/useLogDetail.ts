import { useQueryItemsByLogbook } from "@/lib/hooks/query/logbooks/useQueryItems";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";

/** Functionality hook for LogDetail. */
export default function useLogDetail({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0)); // TODO: do not use 0
	const logId = +(params.logId ?? 0); // TODO: do not use 0
	const { data: logsData } = useQueryLogs();
	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbookId);
	const { data: itemsData } = useQueryItemsByLogbook(logbookId);

	// TODO: as mentioned elsewhere, if we use maps instead of hashmap-like
	// objects, we can avoid most of this pattern
	const log = logsData?.byId[logId] as Maybe<Log>;

	const isProbablySuspended = !itemTemplatesData || !itemsData || !logsData || !log;

	// The conditional return is to make the typing more accurate when we call
	// ths hook from LogDetail.
	if (isProbablySuspended)
		return {
			isProbablySuspended
		};

	return {
		isProbablySuspended,
		itemTemplates: Object.values(itemTemplatesData.byId),
		items: Object.values(itemsData.byId),
		logId,
		logbookId,
		log
	};
}

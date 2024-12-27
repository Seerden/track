import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemsByLogbook } from "@/lib/hooks/query/logbooks/useQueryItems";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import { useQueryLogTemplate } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";

export default function useLogDetailData({
	logbookId,
	logId
}: {
	logbookId: ID;
	logId: ID;
}) {
	const { data: logsData } = useQueryLogs();
	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbookId);

	// TODO: as mentioned elsewhere, if we use maps instead of hashmap-like
	// objects, we can avoid most of this pattern
	const log = logsData?.byId[logId] as Maybe<Log>;
	const itemTemplates = itemTemplatesData?.byId
		? Object.values(itemTemplatesData.byId)
		: [];

	const { data: logTemplate, isFetched } = useQueryLogTemplate(
		log?.log_template_id ?? -1
	);

	// TODO: we also query itemRowsData in useItemSection. Probably not
	// necessary, but since it's cached anyway, it doesn't really matter.
	const { data: itemRowsData } = useQueryItemRowsByLog({ log_id: logId ? +logId : 0 });
	const { data: itemsData } = useQueryItemsByLogbook(logbookId ?? 0);

	const isProbablySuspended =
		!itemTemplatesData || !logsData || !isFetched || !itemRowsData || !itemsData;

	// The conditional return is to make the typing more accurate when we call
	// this hook from useLogDetail.
	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const itemRows = itemRowsData.byId ? Object.values(itemRowsData?.byId) : [];
	const items = itemsData.byId ? Object.values(itemsData.byId) : [];

	return {
		isProbablySuspended,
		itemTemplates,
		log,
		itemRows,
		items,
		logTemplate
	};
}

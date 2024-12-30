import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemsByLogbook } from "@/lib/hooks/query/logbooks/useQueryItems";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import type { Log } from "@t/data/logbook.types";
import type { ID, Maybe } from "@t/data/utility.types";

type UseLogDetailDataArgs = {
	logbookId: ID;
	logId: ID;
};

export default function useLogDetailData({ logbookId, logId }: UseLogDetailDataArgs) {
	const { data: logsData } = useQueryLogs();
	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbookId);
	// TODO: we also query itemRowsData in useItemSection(?). Probably not
	// necessary, but since it's cached anyway, it doesn't really matter.
	const { data: itemRowsData } = useQueryItemRowsByLog({ log_id: +logId });
	const { data: itemsData } = useQueryItemsByLogbook(logbookId ?? 0);

	const isProbablySuspended =
		!itemTemplatesData || !logsData || !itemRowsData || !itemsData;

	// The conditional return is to make the typing more accurate when we call
	// this hook from useLogDetail.
	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	// TODO: as mentioned elsewhere, if we use maps instead of hashmap-like
	// objects, we can avoid most of this pattern
	const log = logsData.byId[logId] as Maybe<Log>;
	const itemTemplates = Object.values(itemTemplatesData.byId);

	return {
		isProbablySuspended,
		itemTemplates,
		log
	};
}

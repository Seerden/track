import { useQueryItemRowsByLog } from "@/lib/hooks/query/logbooks/useQueryItemRows";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import type { ID } from "@t/data/utility.types";

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

	const isProbablySuspended = !itemTemplatesData || !logsData || !itemRowsData;

	// The conditional return is to make the typing more accurate when we call
	// this hook from useLogDetail.
	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const log = logsData.byId.get(logId);
	const itemTemplates = byIdAsList(itemTemplatesData.byId);

	return {
		isProbablySuspended,
		itemTemplates,
		log
	};
}

import { useQueryLogbookById } from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { useQueryLogsByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogs";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@shared/types/data/utility.types";

export default function useLogbookCard({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0));
	const { data: logbook, isSuccess } = useQueryLogbookById(+logbookId);
	const { data: logsData } = useQueryLogsByLogbook(+logbookId);

	const isProbablySuspended = !logsData || !isSuccess;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const logs = byIdAsList(logsData.byId);

	return {
		isProbablySuspended,
		logbook,
		logs
	};
}

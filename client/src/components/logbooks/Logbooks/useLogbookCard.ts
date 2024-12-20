import { useQueryLogbookById } from "@/lib/hooks/query/logbooks/useQueryLogbooks";
import { useQueryLogsByLogbook } from "@/lib/hooks/query/logbooks/useQueryLogs";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@t/data/utility.types";

export default function useLogbookCard({ logbook_id }: { logbook_id?: ID }) {
	const { params } = useRouteProps();
	const logbookId = +(logbook_id ?? (params.logbookId || 0));
	const { data: logbook } = useQueryLogbookById(logbookId);
	const { data: logsData } = useQueryLogsByLogbook(logbookId);

	const isProbablySuspended = !logsData || !logbook;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const logs = Object.values(logsData.byId);

	return {
		isProbablySuspended,
		logbook,
		logs
	};
}

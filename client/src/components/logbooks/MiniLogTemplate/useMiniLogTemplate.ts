import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import useRouteProps from "@/lib/hooks/useRouteProps";
import type { ID } from "@t/data/utility.types";

export default function useMiniLogTemplate({
	log_template_id,
	logbook_id
}: {
	log_template_id: ID;
	logbook_id?: ID;
}) {
	const { params } = useRouteProps();

	const { data: logTemplateData } = useQueryLogTemplateById(log_template_id);
	// TODO: I'm casting as ID, but it's possible that it's undefined (if it's
	// neiithern the URL nor in props). Solve this properly.
	const logbookId = params.logbookId ? +params.logbookId : (logbook_id as ID);

	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbookId);

	const isProbablySuspended = !itemTemplatesData || !logTemplateData;

	if (isProbablySuspended) {
		return null;
	}
}

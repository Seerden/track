import { useQueryFieldTemplatesByItemTemplate } from "@/lib/hooks/query/logbooks/useQueryFieldTemplates";
import { useQueryItemsByItemTemplate } from "@/lib/hooks/query/logbooks/useQueryItems";
import useQueryLogs from "@/lib/hooks/query/logbooks/useQueryLogs";
import { byIdAsList } from "@/lib/hooks/query/select-map-by-id";
import type { ID } from "@shared/types/data/utility.types";

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
	const { data: itemsData } = useQueryItemsByItemTemplate(item_template_id);
	const { data: logsData } = useQueryLogs();
	const { data: fieldTemplatesData } = useQueryFieldTemplatesByItemTemplate({
		item_template_id
	});

	const isProbablySuspended = !itemsData || !logsData || !fieldTemplatesData;

	if (isProbablySuspended) {
		return {
			isProbablySuspended
		};
	}

	const items = byIdAsList(itemsData.byId);
	const log = logsData.byId.get(String(log_id));
	const fieldTemplates = fieldTemplatesData.fieldTemplates;

	return {
		isProbablySuspended,
		items,
		itemsById: itemsData.byId,
		log,
		fieldTemplates
	};
}

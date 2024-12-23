import useQueryFields from "@/lib/hooks/query/logbooks/useQueryFields";
import { useQueryItemTemplatesByLogbook } from "@/lib/hooks/query/logbooks/useQueryItemTemplates";
import { useQueryLogTemplate } from "@/lib/hooks/query/logbooks/useQueryLogTemplates";
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

	const { data: logTemplateData } = useQueryLogTemplate(log_template_id);
	// TODO: I'm casting as ID, but it's possible that it's undefined (if it's
	// neither in the URL nor in props). Solve this properly.
	const logbookId = params.logbookId ? +params.logbookId : (logbook_id as ID);

	const { data: itemTemplatesData } = useQueryItemTemplatesByLogbook(logbookId);
	// TODO: instead of getting fields (we don't need the field values, just the
	// template), create a new query for useQueryFieldTemplatesByItemTemplates,
	// which takes item_template_id and returns a map from itemTemplateId ->
	// field templates by id
	// For now, useQueryFields() is fine, but it's very inefficient.
	const { data: fieldsData } = useQueryFields();

	const isProbablySuspended = !itemTemplatesData || !logTemplateData || !fieldsData;

	if (isProbablySuspended) {
		return { isProbablySuspended };
	}

	const fields = Object.values(fieldsData.byId);

	const itemTemplatesWithFields = Object.entries(itemTemplatesData.byId).map(
		([itemTemplateId, itemTemplate]) => ({
			...itemTemplate,
			fields: fields.filter((field) => +field.item_template_id === +itemTemplateId)
		})
	);

	return {
		isProbablySuspended,
		logTemplate: logTemplateData,
		itemTemplatesWithFields
	};
}

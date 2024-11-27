import api from "@/lib/fetch/api";
import { defaultQueryConfig } from "@/lib/query-client";
import { qk } from "@/lib/query-keys";
import type { ItemTemplatesData } from "@/types/data.types";
import type { ID } from "@t/data/utility.types";
import { useQuery } from "@tanstack/react-query";

async function getItemTemplatesByLogbook(logbook_id: ID) {
	return api.get<ItemTemplatesData>({
		url: `/data/logbook/${logbook_id}/item/templates`
	});
}

export function useQueryItemTemplatesByLogbook(logbook_id: ID) {
	// TODO: does ItemTemplatesData make sense the way it is structured? Do we
	// not want to include the logbook_id in the response?
	return useQuery<ItemTemplatesData>({
		queryKey: qk.itemTemplates.byLogbook(logbook_id),
		queryFn: () => getItemTemplatesByLogbook(logbook_id),
		...defaultQueryConfig
	});
}

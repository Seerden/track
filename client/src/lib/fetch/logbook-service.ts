import api from "@/lib/fetch/api";
import type {
	FieldsData,
	ItemRowsData,
	ItemsData,
	ItemTemplatesData,
	LogbooksData,
	LogsData,
	LogTemplatesData
} from "@/types/data.types";
import type { Logbook } from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";

export async function getLogbooks() {
	return api.get<LogbooksData>({ url: "/data/logbooks" });
}

export async function getLogbookById(logbook_id: ID) {
	return api.get<Nullable<Logbook>>({ url: `/data/logbook/${logbook_id}` });
}

export async function getLogs() {
	return api.get<LogsData>({ url: "/data/logbooks/logs" });
}

export async function getLogsByLogbook(logbook_id: ID) {
	return api.get<LogsData>({ url: `/data/logbook/${logbook_id}/logs` });
}

export async function getLogTemplates() {
	return api.get<LogTemplatesData>({ url: "/data/logbook/templates" });
}

export async function getLogTemplatesByLogbook(logbook_id: ID) {
	return api.get<LogTemplatesData>({ url: `/data/logbook/${logbook_id}/templates` });
}

export async function getItemTemplatesByLogbook(logbook_id: ID) {
	return api.get<ItemTemplatesData>({
		url: `/data/logbook/${logbook_id}/item/templates`
	});
}

export async function getItemsByLogbook(logbook_id: ID) {
	return api.get<ItemsData>({ url: `/data/logbook/${logbook_id}/items` });
}

export async function getItems() {
	return api.get<ItemsData>({ url: "/data/logbooks/items" });
}

export async function getItemRows() {
	return api.get<ItemRowsData>({ url: "/data/logbooks/items/rows" });
}

export async function getFields() {
	return api.get<FieldsData>({ url: "/data/logbooks/fields" });
}

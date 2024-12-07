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
import type {
	Item,
	ItemRowWithFieldValues,
	ItemTemplateAndFieldTemplates,
	Log,
	Logbook,
	LogbookInput,
	LogTemplate,
	NewItemInput,
	NewItemRowInput,
	NewItemTemplateInput,
	NewLogbookInput,
	NewLogInput,
	NewLogTemplateInput
} from "@t/data/logbook.types";
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

export async function postNewLogbook(input: NewLogbookInput) {
	return api.post<NewLogbookInput, Logbook>({
		url: "/data/logbook",
		body: input
	});
}

export async function postNewLog(input: NewLogInput) {
	return api.post<NewLogInput, Log>({
		url: "/data/logbook/log",
		body: input
	});
}

export async function postNewItemTemplate(input: NewItemTemplateInput) {
	return api.post<NewItemTemplateInput, ItemTemplateAndFieldTemplates>({
		url: "/data/logbook/item/template",
		body: input
	});
}

export async function postNewItemRow(input: NewItemRowInput) {
	return api.post<NewItemRowInput, ItemRowWithFieldValues>({
		url: "/data/logbook/item/row",
		body: input
	});
}

export async function postNewItem(input: NewItemInput) {
	return api.post<NewItemInput, Item>({
		url: "/data/logbook/item",
		body: input
	});
}

export async function putLogbook(input: LogbookInput) {
	return api.put<LogbookInput, Logbook>({
		url: `/data/logbook/${input.logbook.logbook_id}`,
		body: input
	});
}

export async function postNewLogTemplate(
	input: NewLogTemplateInput
): Promise<LogTemplate> {
	return api.post<NewLogTemplateInput, LogTemplate>({
		url: "/data/logbook/template",
		body: input
	});
}

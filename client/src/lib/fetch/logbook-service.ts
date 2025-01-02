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
	FieldTemplateWithValue,
	Item,
	ItemRowWithFieldValues,
	ItemTemplateAndFieldTemplates,
	Log,
	Logbook,
	LogbookInput,
	LogInput,
	LogTemplate,
	NewItemInput,
	NewItemRowInput,
	NewItemTemplateInput,
	NewLogbookInput,
	NewLogInput,
	NewLogTemplateInput
} from "@t/data/logbook.types";
import type { ID, Nullable } from "@t/data/utility.types";

const logbookService = {
	logbooks: {
		getByUser: async () => api.get<LogbooksData>({ url: "/data/logbooks" }),
		getById: async (logbook_id: ID) =>
			api.get<Nullable<Logbook>>({ url: `/data/logbook/${logbook_id}` }),
		post: async (input: NewLogbookInput) =>
			api.post<NewLogbookInput, Logbook>({
				url: "/data/logbook",
				body: input
			}),
		put: async (input: LogbookInput) =>
			api.put<LogbookInput, Logbook>({
				url: `/data/logbook/${input.logbook.logbook_id}`,
				body: input
			})
	},
	logs: {
		getByUser: async () => api.get<LogsData>({ url: "/data/logbooks/logs" }),
		getByLogbook: async (logbook_id: ID) =>
			api.get<LogsData>({ url: `/data/logbook/${logbook_id}/logs` }),
		post: async (input: NewLogInput) =>
			api.post<NewLogInput, Log>({
				url: "/data/logbook/log",
				body: input
			}),
		put: async (input: LogInput) =>
			api.put<LogInput, Log>({
				url: `/data/logbook/log/${input.log.log_id}`,
				body: input
			})
	},
	logTemplates: {
		getById: async (log_template_id: ID) =>
			api.get<Nullable<LogTemplate>>({
				url: `/data/logbook/template/${log_template_id}`
			}),
		getByUser: async () =>
			api.get<LogTemplatesData>({ url: "/data/logbook/templates" }),
		getByLogbook: async (logbook_id: ID) =>
			api.get<LogTemplatesData>({ url: `/data/logbook/${logbook_id}/templates` }),
		post: async (input: NewLogTemplateInput) =>
			api.post<NewLogTemplateInput, LogTemplate>({
				url: "/data/logbook/template",
				body: input
			})
	},
	itemTemplates: {
		getByLogbook: async (logbook_id: ID) =>
			api.get<ItemTemplatesData>({
				url: `/data/logbook/${logbook_id}/item/templates`
			}),
		post: async (input: NewItemTemplateInput) =>
			api.post<NewItemTemplateInput, ItemTemplateAndFieldTemplates>({
				url: "/data/logbook/item/template",
				body: input
			})
	},
	items: {
		getByUser: async () => api.get<ItemsData>({ url: "/data/logbooks/items" }),
		getByTemplate: async (item_template_id: ID) =>
			api.get<ItemsData>({
				url: `/data/logbook/items/template/${item_template_id}/items`
			}),
		getByLogbook: async (logbook_id: ID) =>
			api.get<ItemsData>({ url: `/data/logbook/${logbook_id}/items` }),
		post: async (input: NewItemInput) =>
			api.post<NewItemInput, Item>({
				url: "/data/logbook/item",
				body: input
			})
	},
	itemRows: {
		getByUser: async () => api.get<ItemRowsData>({ url: "/data/logbooks/items/rows" }),
		getByLog: async (log_id: ID) =>
			api.get<ItemRowsData>({ url: `/data/logbook/log/${log_id}/items/rows` }),
		getByLogItem: async ({ log_id, item_id }: { log_id: ID; item_id: ID }) =>
			api.get<ItemRowsData>({
				url: `/data/logbook/log/${log_id}/items/${item_id}/rows`
			}),
		post: async (input: NewItemRowInput) =>
			api.post<NewItemRowInput, ItemRowWithFieldValues>({
				url: "/data/logbook/item/row",
				body: input
			})
	},
	fields: {
		getByUser: async () => api.get<FieldsData>({ url: "/data/logbooks/fields" }),
		getByItemRow: async ({ item_row_id }: { item_row_id: ID }) =>
			api.get<{ fields: FieldTemplateWithValue[] }>({
				url: `/data/logbooks/items/rows/${item_row_id}/fields`
			})
	}
};

export default logbookService;

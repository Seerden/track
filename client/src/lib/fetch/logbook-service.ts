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
import { clientUrlBuilder } from "@shared/lib/client-url-builder";
import { logbookEndpointsService as urls } from "@shared/lib/endpoints/logbooks-endpoints";
import type {
	FieldTemplate,
	FieldTemplateWithMaybeValue,
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
} from "@shared/types/data/logbook.types";
import type { ID, Nullable } from "@shared/types/data/utility.types";

const getPath = (url: string) => clientUrlBuilder(url, "/data/logbooks").makeClientPath;

const logbookService = {
	logbooks: {
		getByUser: async () =>
			api.get<LogbooksData>({
				url: getPath(urls.logbooks.get.getByUser)({})
			}),
		getById: async (logbook_id: ID) =>
			api.get<Nullable<Logbook>>({
				url: getPath(urls.logbooks.get.getById)({ logbook_id })
			}),
		post: async (input: NewLogbookInput) =>
			api.post<NewLogbookInput, Logbook>({
				url: getPath(urls.logbooks.post.post)({}),
				body: input
			}),
		put: async (input: LogbookInput) =>
			api.put<LogbookInput, Logbook>({
				url: getPath(urls.logbooks.put.put)({ logbook_id: input.logbook.logbook_id }),
				body: input
			})
	},
	logs: {
		getByUser: async () =>
			api.get<LogsData>({
				url: getPath(urls.logs.get.getByUser)({})
			}),
		getByLogbook: async (logbook_id: ID) =>
			api.get<LogsData>({
				url: getPath(urls.logs.get.getByLogbook)({ logbook_id })
			}),
		post: async (input: NewLogInput) =>
			api.post<NewLogInput, Log>({
				url: getPath(urls.logs.post.post)({}),
				body: input
			}),
		put: async (input: LogInput) =>
			api.put<LogInput, Log>({
				url: getPath(urls.logs.put.put)({ log_id: input.log.log_id }),
				body: input
			})
	},
	logTemplates: {
		getById: async (log_template_id: ID) =>
			api.get<Nullable<LogTemplate>>({
				url: getPath(urls.logTemplates.get.getById)({ log_template_id })
			}),
		getByUser: async () =>
			api.get<LogTemplatesData>({
				url: getPath(urls.logTemplates.get.getByUser)({})
			}),
		getByLogbook: async (logbook_id: ID) =>
			api.get<LogTemplatesData>({
				url: getPath(urls.logTemplates.get.getByLogbook)({ logbook_id })
			}),
		post: async (input: NewLogTemplateInput) =>
			api.post<NewLogTemplateInput, LogTemplate>({
				url: getPath(urls.logTemplates.post.post)({}),
				body: input
			})
	},
	itemTemplates: {
		getByLogbook: async (logbook_id: ID) =>
			api.get<ItemTemplatesData>({
				url: getPath(urls.itemTemplates.get.getByLogbook)({ logbook_id })
			}),
		post: async (input: NewItemTemplateInput) =>
			api.post<NewItemTemplateInput, ItemTemplateAndFieldTemplates>({
				url: getPath(urls.itemTemplates.post.post)({}),
				body: input
			})
	},
	items: {
		getByUser: async () => api.get<ItemsData>({ url: "/data/logbooks/items" }),
		getByTemplate: async (item_template_id: ID) =>
			api.get<ItemsData>({
				url: getPath(urls.items.get.getByTemplate)({ item_template_id })
			}),
		getByLogbook: async (logbook_id: ID) =>
			api.get<ItemsData>({ url: `/data/logbook/${logbook_id}/items` }),
		post: async (input: NewItemInput) =>
			api.post<NewItemInput, Item>({
				url: getPath(urls.items.post.post)({}),
				body: input
			})
	},
	itemRows: {
		getByUser: async () =>
			api.get<ItemRowsData>({
				url: getPath(urls.itemRows.get.getByUser)({})
			}),
		getByLog: async (log_id: ID) =>
			api.get<ItemRowsData>({
				url: getPath(urls.itemRows.get.getByLog)({ log_id })
			}),
		getByLogItem: async ({ log_id, item_id }: { log_id: ID; item_id: ID }) =>
			api.get<ItemRowsData>({
				url: getPath(urls.itemRows.get.getByLogItem)({ log_id, item_id })
			}),
		post: async (input: NewItemRowInput) =>
			api.post<NewItemRowInput, ItemRowWithFieldValues>({
				url: getPath(urls.itemRows.post.post)({}),
				body: input
			})
	},
	fields: {
		getByUser: async () =>
			api.get<FieldsData>({
				url: getPath(urls.fields.get.getByUser)({})
			}),
		getByItemRow: async ({ item_row_id }: { item_row_id: ID }) =>
			api.get<{ fields: FieldTemplateWithMaybeValue[] }>({
				url: getPath(urls.fields.get.getByItemRow)({ item_row_id })
			})
	},
	fieldTemplates: {
		getByItemTemplate: async (item_template_id: ID) =>
			api.get<{ fieldTemplates: FieldTemplate[] }>({
				url: getPath(urls.fieldTemplates.get.getByItemTemplate)({ item_template_id })
			})
	}
};

export default logbookService;

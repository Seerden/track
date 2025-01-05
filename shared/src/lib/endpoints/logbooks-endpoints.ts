import { ServerSubService, SubService } from "./endpoint.types";

/** all the sub-domains of the logbooks service. */
type LogbookSubService =
	| "logbooks"
	| "logs"
	| "logTemplates"
	| "itemTemplates"
	| "items"
	| "itemRows"
	| "fields"
	| "fieldTemplates";

export type LogbookService = Record<LogbookSubService, SubService>;
/** ^, but adapted for the server */
export type ServerLogbookService = Record<LogbookSubService, ServerSubService>;

// base: data/logbooks
const logbooks = {
	get: {
		getByUser: "/logbooks",
		getById: "/logbooks/:logbook_id",
	} as const,
	post: {
		post: "/",
	} as const,
	delete: {
		delete: "/:logbook_id",
	} as const,
	put: {
		put: "/:logbook_id",
	} as const,
} satisfies SubService;

const logs = {
	get: {
		getByUser: "/logs",
		getByLogbook: "/:logbook_id/logs",
	},
	post: {
		post: "/log",
	},
	put: {
		put: "/log/:log_id",
	},
	delete: {
		delete: "/log/:log_id",
	},
} satisfies SubService;

const logTemplates = {
	get: {
		getById: "/templates/:log_template_id",
		getByUser: "/templates",
		getByLogbook: "/:logbook_id/templates",
	},
	post: {
		post: "/template",
	},
	put: {},
	delete: {
		delete: "/log/template/:log_template_id",
	},
} satisfies SubService;

const itemTemplates = {
	get: {
		getByLogbook: "/:logbook_id/item/templates",
	},
	post: {
		post: "/item/template",
	},
	put: {},
	delete: {
		delete: "/item/template/:item_template_id",
	},
} satisfies SubService;

const items = {
	get: {
		getByUser: "/items",
		getByTemplate: "/items/templates/:item_template_id/items",
		getByLogbook: "/:logbook_id/items",
	},
	post: {
		post: "/item",
	},
	put: {},
	delete: {
		delete: "/item/:item_id",
	},
} satisfies SubService;

const itemRows = {
	get: {
		getByUser: "/items/rows",
		getByLog: "/logs/:log_id/items/rows",
		getByLogItem: "/logs/:log_id/items/:item_id/rows",
	},
	post: {
		post: "/item/row",
	},
	put: {},
	delete: {},
};

const fields = {
	get: {
		getByUser: "/fields",
		getByItemRow: "/items/rows/:item_row_id/fields",
	},
	post: {},
	put: {},
	delete: {},
} satisfies SubService;

const fieldTemplates = {
	get: {
		getByItemTemplate: "/items/templates/:item_template_id/fields/templates",
	},
	post: {},
	put: {},
	delete: {},
} satisfies SubService;

export const logbookEndpointsService = {
	logbooks,
	logs,
	logTemplates,
	itemTemplates,
	items,
	itemRows,
	fields,
	fieldTemplates,
} satisfies LogbookService;

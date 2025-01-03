/** this represents the endpoint relative to the router itself. When consuming
 * it, don't forget to make it absolute where necessary!  */
type RelativePath = string;

/** @example { byUser: "/logbooks" } would be the value of a subservice.get  */
type SubServiceByMethod = Record<string, RelativePath>;
/** ^, but adapted for the server */
export type ServerSubServiceByMethod = Record<
	string,
	{
		path: string;
		handler: Function; // this is always a RequestHandler, but that isn't defined in /shared
	}
>;

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

/** the HTTP methods we use */
type Method = "get" | "post" | "put" | "delete";

/** represents the routes, grouped by method, for a subservice. These are
 * relative to the router itself, but not further subdivided (e.g. if we have a
 * logbooksRouter used at /data/logbooks, then each subservice in a service will
 * be relative to this, and e.g. the logs subservice won't be under
 * /data/logbooks/logs). */
export type SubService = Record<Method, SubServiceByMethod>;
/** ^, but adapted for the server */
export type ServerSubService = Record<Method, ServerSubServiceByMethod>;

type LogbookService = Record<LogbookSubService, SubService>;
/** ^, but adapted for the server */
export type ServerLogbookService = Record<LogbookSubService, ServerSubService>;

const logbooks = {
	get: {
		getByUser: "/",
		getById: "/:logbook_id",
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

/** this maps SubService to ServerSubService.
 * @usage const _logbooks = ServerSubServiceMap<typeof logbookEndpointsService>
 * this will make sure all the keys are equal, then we can define the handlers
 */
export type ServerSubServiceMap<T extends SubService> = {
	[M in keyof T]: {
		[K in keyof T[M]]: {
			path: T[M][K];
			handler: Function;
		};
	};
};

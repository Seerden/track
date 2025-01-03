import { deleteLogbook } from "@/lib/data/request-handlers/delete/delete-logbook";
import { getFieldTemplatesByItemTemplate } from "@/lib/data/request-handlers/get/get-field-templates";
import {
	getFields,
	getFieldsByItemRow,
} from "@/lib/data/request-handlers/get/get-fields";
import {
	getItemRows,
	getItemRowsByLog,
	getItemRowsByLogItem,
} from "@/lib/data/request-handlers/get/get-item-rows";
import { getItemTemplatesByLogbook } from "@/lib/data/request-handlers/get/get-item-templates";
import {
	getItems,
	getItemsByLogbook,
	getItemsByTemplate,
} from "@/lib/data/request-handlers/get/get-items";
import {
	getLogTemplate,
	getLogTemplates,
	getLogTemplatesByLogbook,
} from "@/lib/data/request-handlers/get/get-log-templates";
import { getLogbook, getLogbooks } from "@/lib/data/request-handlers/get/get-logbooks";
import { getLogs, getLogsByLogbook } from "@/lib/data/request-handlers/get/get-logs";
import { postItem } from "@/lib/data/request-handlers/post/post-item";
import { postItemRow } from "@/lib/data/request-handlers/post/post-item-row";
import { postItemTemplate } from "@/lib/data/request-handlers/post/post-item-template";
import { postLog } from "@/lib/data/request-handlers/post/post-log";
import { postLogTemplate } from "@/lib/data/request-handlers/post/post-log-template";
import { postLogbook } from "@/lib/data/request-handlers/post/post-logbook";
import { putLog } from "@/lib/data/request-handlers/put/put-log";
import { putLogbook } from "@/lib/data/request-handlers/put/put-logbook";
import type { RequestHandler } from "express";

type EndpointConfig = {
	path: string;
	handler: RequestHandler;
};

type EndpointGroup = Record<string, EndpointConfig>;

const logbooks: EndpointGroup = {
	getByUser: {
		path: "/",
		handler: getLogbooks,
	},
	getById: {
		path: "/:logbook_id",
		handler: getLogbook,
	},
	post: {
		path: "/",
		handler: postLogbook,
	},
	delete: {
		path: "/:logbook_id",
		handler: deleteLogbook,
	},
	put: {
		path: "/:logbook_id",
		handler: putLogbook,
	},
};

const logs: EndpointGroup = {
	getByUser: {
		path: "/logs",
		handler: getLogs,
	},
	getByLogbook: {
		path: "/:logbook_id/logs",
		handler: getLogsByLogbook,
	},
	post: {
		path: "/log",
		handler: postLog,
	},
	put: {
		path: "/log/:log_id",
		handler: putLog,
	},
};

const logTemplates: EndpointGroup = {
	getById: {
		path: "/templates/:log_template_id",
		handler: getLogTemplate,
	},
	getByUser: {
		path: "/templates",
		handler: getLogTemplates,
	},
	getByLogbook: {
		path: "/:logbook_id/templates",
		handler: getLogTemplatesByLogbook,
	},

	post: {
		path: "/template",
		handler: postLogTemplate,
	},
};

// TODO: I'm working on making this object out of all the routes,
// the structure (top-level and second-level keys) match those in the client
// logbook-service.
// not sure how we're going to reconcile the two, but we'll see when we get there.

// TODO: the delete handlers aren't in the client logbook-service.

// TODO: I guess the goal is to have the list of server routes in /shared, then
// we include those by key in this service here (e.g.
// itemTemplates.getByLogbook.path = paths.itemTemplates.getByLogbook),
// and then we use that to generate the client paths. The only thing to figure
// out is how to add the handlers here and in the client, since they're shaped
// very differently. I guess that part stays manual.

const itemTemplates: EndpointGroup = {
	getByLogbook: {
		path: "/:logbook_id/item/templates",
		handler: getItemTemplatesByLogbook,
	},
	post: {
		path: "/item/template",
		handler: postItemTemplate,
	},
};

const items: EndpointGroup = {
	getByUser: {
		path: "/items",
		handler: getItems,
	},
	getByTemplate: {
		path: "/items/templates/:item_template_id/items",
		handler: getItemsByTemplate,
	},
	getByLogbook: {
		path: "/:logbook_id/items",
		handler: getItemsByLogbook,
	},
	post: {
		path: "/item",
		handler: postItem,
	},
};

const itemRows: EndpointGroup = {
	getByUser: {
		path: "/items/rows",
		handler: getItemRows,
	},
	getByLog: {
		path: "/logs/:log_id/items/rows",
		handler: getItemRowsByLog,
	},
	getByLogItem: {
		path: "/logs/:log_id/items/:item_id/rows",
		handler: getItemRowsByLogItem,
	},
	post: {
		path: "/item/row",
		handler: postItemRow,
	},
};

const fields: EndpointGroup = {
	getByUser: {
		path: "/fields",
		handler: getFields,
	},
	getByItemRow: {
		path: "/items/rows/:item_row_id/fields",
		handler: getFieldsByItemRow,
	},
};

const fieldTemplates: EndpointGroup = {
	getByItemTemplate: {
		path: "/items/templates/:item_template_id/fields/templates",
		handler: getFieldTemplatesByItemTemplate,
	},
};

export const logbookService = {
	logbooks,
	logs,
	logTemplates,
	itemTemplates,
	items,
	itemRows,
	fields,
	fieldTemplates,
};

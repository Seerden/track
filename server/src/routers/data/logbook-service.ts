// This one has the same structure as in shared/logbooks-endpoints,
// except instead of strings, the values are objects with a path (the string)
// and a handler (specific to the server).

import { deleteItem } from "@/lib/data/request-handlers/delete/delete-item";
import { deleteItemTemplate } from "@/lib/data/request-handlers/delete/delete-item-template";
import { deleteLog } from "@/lib/data/request-handlers/delete/delete-log";
import { deleteLogTemplate } from "@/lib/data/request-handlers/delete/delete-log-template";
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
import { logbookEndpointsService } from "@shared/lib/endpoints/logbooks-endpoints";
import { mapEndpoints } from "@shared/lib/endpoints/map-endpoints";

export const logbookServiceMapped = {
	logbooks: mapEndpoints(logbookEndpointsService.logbooks, {
		get: {
			getByUser: getLogbooks,
			getById: getLogbook,
		},
		post: {
			post: postLogbook,
		},
		put: {
			put: putLogbook,
		},
		delete: {
			delete: deleteLogbook,
		},
	}),
	logs: mapEndpoints(logbookEndpointsService.logs, {
		get: {
			getByUser: getLogs,
			getByLogbook: getLogsByLogbook,
		},
		post: {
			post: postLog,
		},
		put: {
			put: putLog,
		},
		delete: {
			delete: deleteLog,
		},
	}),
	logTemplates: mapEndpoints(logbookEndpointsService.logTemplates, {
		get: {
			getById: getLogTemplate,
			getByUser: getLogTemplates,
			getByLogbook: getLogTemplatesByLogbook,
		},
		post: {
			post: postLogTemplate,
		},
		put: {},
		delete: {
			delete: deleteLogTemplate,
		},
	}),
	itemTemplates: mapEndpoints(logbookEndpointsService.itemTemplates, {
		get: {
			getByLogbook: getItemTemplatesByLogbook,
		},
		post: {
			post: postItemTemplate,
		},
		put: {},
		delete: {
			delete: deleteItemTemplate,
		},
	}),
	items: mapEndpoints(logbookEndpointsService.items, {
		get: {
			getByUser: getItems,
			getByTemplate: getItemsByTemplate,
			getByLogbook: getItemsByLogbook,
		},
		post: {
			post: postItem,
		},
		put: {},
		delete: {
			delete: deleteItem,
		},
	}),
	itemRows: mapEndpoints(logbookEndpointsService.itemRows, {
		get: {
			getByUser: getItemRows,
			getByLog: getItemRowsByLog,
			getByLogItem: getItemRowsByLogItem,
		},
		put: {},
		post: {
			post: postItemRow,
		},
		delete: {},
	}),
	fields: mapEndpoints(logbookEndpointsService.fields, {
		get: {
			getByUser: getFields,
			getByItemRow: getFieldsByItemRow,
		},
		post: {},
		put: {},
		delete: {},
	}),
	fieldTemplates: mapEndpoints(logbookEndpointsService.fieldTemplates, {
		get: {
			getByItemTemplate: getFieldTemplatesByItemTemplate,
		},
		post: {},
		put: {},
		delete: {},
	}),
};

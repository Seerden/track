// This one has the same structure as in shared/logbooks-endpoints,
// except instead of strings, the values are objects with a path (the string)
// and a handler (specific to the server).

import logbookHandlers from "@lib/data/request-handlers/logbooks/_handlers";
import type { MappedService } from "@shared/lib/endpoints/endpoint.types";
import type { LogbookService } from "@shared/lib/endpoints/logbooks-endpoints";
import { logbookEndpointsService } from "@shared/lib/endpoints/logbooks-endpoints";
import { mapEndpoints } from "@shared/lib/endpoints/map-endpoints";

const { get, put, post, delete: _delete } = logbookHandlers;

export const logbookServiceMapped: MappedService<LogbookService> = {
	logbooks: mapEndpoints(logbookEndpointsService.logbooks, {
		get: {
			getByUser: get.getLogbooks,
			getById: get.getLogbook,
		},
		post: {
			post: post.postLogbook,
		},
		put: {
			put: put.putLogbook,
		},
		delete: {
			delete: _delete.deleteLogbook,
		},
	}),
	logs: mapEndpoints(logbookEndpointsService.logs, {
		get: {
			getByUser: get.getLogs,
			getByLogbook: get.getLogsByLogbook,
		},
		post: {
			post: post.postLog,
		},
		put: {
			put: put.putLog,
		},
		delete: {
			delete: _delete.deleteLog,
		},
	}),
	logTemplates: mapEndpoints(logbookEndpointsService.logTemplates, {
		get: {
			getById: get.getLogTemplate,
			getByUser: get.getLogTemplates,
			getByLogbook: get.getLogTemplatesByLogbook,
		},
		post: {
			post: post.postLogTemplate,
		},
		put: {},
		delete: {
			delete: _delete.deleteLogTemplate,
		},
	}),
	itemTemplates: mapEndpoints(logbookEndpointsService.itemTemplates, {
		get: {
			getByLogbook: get.getItemTemplatesByLogbook,
		},
		post: {
			post: post.postItemTemplate,
		},
		put: {},
		delete: {
			delete: _delete.deleteItemTemplate,
		},
	}),
	items: mapEndpoints(logbookEndpointsService.items, {
		get: {
			getByUser: get.getItems,
			getByTemplate: get.getItemsByTemplate,
			getByLogbook: get.getItemsByLogbook,
		},
		post: {
			post: post.postItem,
		},
		put: {},
		delete: {
			delete: _delete.deleteItem,
		},
	}),
	itemRows: mapEndpoints(logbookEndpointsService.itemRows, {
		get: {
			getByUser: get.getItemRows,
			getByLog: get.getItemRowsByLog,
			getByLogItem: get.getItemRowsByLogItem,
		},
		put: {},
		post: {
			post: post.postItemRow,
		},
		delete: {},
	}),
	fields: mapEndpoints(logbookEndpointsService.fields, {
		get: {
			getByUser: get.getFields,
			getByItemRow: get.getFieldsByItemRow,
		},
		post: {},
		put: {},
		delete: {},
	}),
	fieldTemplates: mapEndpoints(logbookEndpointsService.fieldTemplates, {
		get: {
			getByItemTemplate: get.getFieldTemplatesByItemTemplate,
		},
		post: {},
		put: {},
		delete: {},
	}),
};

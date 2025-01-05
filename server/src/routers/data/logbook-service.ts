// This one has the same structure as in shared/logbooks-endpoints,
// except instead of strings, the values are objects with a path (the string)
// and a handler (specific to the server).

import logbookHandlers from "@lib/data/request-handlers/logbooks/_handlers";
import type { MappedService } from "@shared/lib/endpoints/endpoint.types";
import type { LogbookService } from "@shared/lib/endpoints/logbooks-endpoints";
import { logbookEndpointsService } from "@shared/lib/endpoints/logbooks-endpoints";
import { mapEndpoints } from "@shared/lib/endpoints/map-endpoints";

const { GET, PUT, POST, DELETE } = logbookHandlers;

export const logbookServiceMapped: MappedService<LogbookService> = {
	logbooks: mapEndpoints(logbookEndpointsService.logbooks, {
		get: {
			getByUser: GET.getLogbooks,
			getById: GET.getLogbook,
		},
		post: {
			post: POST.postLogbook,
		},
		put: {
			put: PUT.putLogbook,
		},
		delete: {
			delete: DELETE.deleteLogbook,
		},
	}),
	logs: mapEndpoints(logbookEndpointsService.logs, {
		get: {
			getByUser: GET.getLogs,
			getByLogbook: GET.getLogsByLogbook,
		},
		post: {
			post: POST.postLog,
		},
		put: {
			put: PUT.putLog,
		},
		delete: {
			delete: DELETE.deleteLog,
		},
	}),
	logTemplates: mapEndpoints(logbookEndpointsService.logTemplates, {
		get: {
			getById: GET.getLogTemplate,
			getByUser: GET.getLogTemplates,
			getByLogbook: GET.getLogTemplatesByLogbook,
		},
		post: {
			post: POST.postLogTemplate,
		},
		put: {},
		delete: {
			delete: DELETE.deleteLogTemplate,
		},
	}),
	itemTemplates: mapEndpoints(logbookEndpointsService.itemTemplates, {
		get: {
			getByLogbook: GET.getItemTemplatesByLogbook,
		},
		post: {
			post: POST.postItemTemplate,
		},
		put: {},
		delete: {
			delete: DELETE.deleteItemTemplate,
		},
	}),
	items: mapEndpoints(logbookEndpointsService.items, {
		get: {
			getByUser: GET.getItems,
			getByTemplate: GET.getItemsByTemplate,
			getByLogbook: GET.getItemsByLogbook,
		},
		post: {
			post: POST.postItem,
		},
		put: {},
		delete: {
			delete: DELETE.deleteItem,
		},
	}),
	itemRows: mapEndpoints(logbookEndpointsService.itemRows, {
		get: {
			getByUser: GET.getItemRows,
			getByLog: GET.getItemRowsByLog,
			getByLogItem: GET.getItemRowsByLogItem,
		},
		put: {},
		post: {
			post: POST.postItemRow,
		},
		delete: {},
	}),
	fields: mapEndpoints(logbookEndpointsService.fields, {
		get: {
			getByUser: GET.getFields,
			getByItemRow: GET.getFieldsByItemRow,
		},
		post: {},
		put: {},
		delete: {},
	}),
	fieldTemplates: mapEndpoints(logbookEndpointsService.fieldTemplates, {
		get: {
			getByItemTemplate: GET.getFieldTemplatesByItemTemplate,
		},
		post: {},
		put: {},
		delete: {},
	}),
};

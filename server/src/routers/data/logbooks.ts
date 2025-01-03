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
import { Router } from "express";

export const logbooksRouter = Router({ mergeParams: true });

// TODO: put these in logbookRouter
// TODO: I'm using more specific names for the handlers. Go over previous
// handlers and do the same for them, too.
/* --- POST --- */
logbooksRouter.post("/logbook", postLogbook);
logbooksRouter.post("/logbook/template", postLogTemplate);
logbooksRouter.post("/logbook/log", postLog);
logbooksRouter.post("/logbook/item/template", postItemTemplate);
logbooksRouter.post("/logbook/item/row", postItemRow);
logbooksRouter.post("/logbook/item", postItem);

/* --- DELETE --- */
logbooksRouter.delete("/logbook/log/template/:log_template_id", deleteLogTemplate);
logbooksRouter.delete("/logbook/log/:log_id", deleteLog);
logbooksRouter.delete("/logbook/item/template/:item_template_id", deleteItemTemplate);
logbooksRouter.delete("/logbook/item/:item_id", deleteItem);
logbooksRouter.delete("/logbook/:logbook_id", deleteLogbook);

/* --- GET --- */
logbooksRouter.get("/logbooks", getLogbooks);
logbooksRouter.get("/logbooks/logs", getLogs);

logbooksRouter.get("/logbooks/items/rows/:item_row_id/fields", getFieldsByItemRow);
// This should probably take the logbook_id as a parameter, but it's simpler for
// the frontend now to not worry about that
logbooksRouter.get("/logbook/log/:log_id/items/rows", getItemRowsByLog);
logbooksRouter.get("/logbook/log/:log_id/items/:item_id/rows", getItemRowsByLogItem);

logbooksRouter.get("/logbook/:logbook_id", getLogbook);
logbooksRouter.get("/logbook/:logbook_id/logs", getLogsByLogbook);
logbooksRouter.get("/logbook/:logbook_id/items", getItemsByLogbook);
logbooksRouter.get("/logbook/:logbook_id/item/templates", getItemTemplatesByLogbook);
logbooksRouter.get("/logbook/templates", getLogTemplates);
logbooksRouter.get("/logbook/template/:log_template_id", getLogTemplate);
logbooksRouter.get("/logbook/:logbook_id/templates", getLogTemplatesByLogbook);
logbooksRouter.get("/logbooks/fields", getFields);
logbooksRouter.get("/logbooks/items/rows", getItemRows);
logbooksRouter.get("/logbook/items/template/:item_template_id/items", getItemsByTemplate);
logbooksRouter.get(
	"/logbook/items/template/:item_template_id/fields/templates",
	getFieldTemplatesByItemTemplate,
);
logbooksRouter.get("/logbooks/items", getItems);

/* --- PUT --- */
logbooksRouter.put("/logbook/log/:log_id", putLog);
logbooksRouter.put("/logbook/:logbook_id", putLogbook);

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

// TODO: I'm using more specific names for the handlers. Go over previous
// handlers and do the same for them, too.

/* --- POST --- */
logbooksRouter.post("/", postLogbook);
logbooksRouter.post("/template", postLogTemplate);
logbooksRouter.post("/log", postLog);
logbooksRouter.post("/item/template", postItemTemplate);
logbooksRouter.post("/item/row", postItemRow);
logbooksRouter.post("/item", postItem);

/* --- DELETE --- */
logbooksRouter.delete("/log/template/:log_template_id", deleteLogTemplate);
logbooksRouter.delete("/log/:log_id", deleteLog);
logbooksRouter.delete("/item/template/:item_template_id", deleteItemTemplate);
logbooksRouter.delete("/item/:item_id", deleteItem);
logbooksRouter.delete("/:logbook_id", deleteLogbook);

/* --- GET --- */
logbooksRouter.get("/", getLogbooks);
logbooksRouter.get("/logs", getLogs);

logbooksRouter.get("/items/rows/:item_row_id/fields", getFieldsByItemRow);

// This should probably take the logbook_id as a parameter, but it's simpler for
// the frontend now to not worry about that
logbooksRouter.get("/log/:log_id/items/rows", getItemRowsByLog);
logbooksRouter.get("/log/:log_id/items/:item_id/rows", getItemRowsByLogItem);

logbooksRouter.get("/:logbook_id", getLogbook);
logbooksRouter.get("/:logbook_id/logs", getLogsByLogbook);
logbooksRouter.get("/:logbook_id/items", getItemsByLogbook);
logbooksRouter.get("/:logbook_id/item/templates", getItemTemplatesByLogbook);
logbooksRouter.get("/templates", getLogTemplates);
logbooksRouter.get("/template/:log_template_id", getLogTemplate);
logbooksRouter.get("/:logbook_id/templates", getLogTemplatesByLogbook);
logbooksRouter.get("/fields", getFields);
logbooksRouter.get("/items/rows", getItemRows);
logbooksRouter.get("/items/template/:item_template_id/items", getItemsByTemplate);
logbooksRouter.get(
	"/items/template/:item_template_id/fields/templates",
	getFieldTemplatesByItemTemplate,
);
logbooksRouter.get("/items", getItems);

/* --- PUT --- */
logbooksRouter.put("/log/:log_id", putLog);
logbooksRouter.put("/:logbook_id", putLogbook);

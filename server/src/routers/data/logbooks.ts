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
logbooksRouter.post("/", postLogbook); // logbooks.post
logbooksRouter.post("/log", postLog); // logs.post
logbooksRouter.post("/template", postLogTemplate); // logTemplates.post
logbooksRouter.post("/item/template", postItemTemplate); // itemTemplates.post
logbooksRouter.post("/item/row", postItemRow); // itemRows.post
logbooksRouter.post("/item", postItem); // items.post

/* --- DELETE --- */
logbooksRouter.delete("/:logbook_id", deleteLogbook); // logbooks.delete
logbooksRouter.delete("/log/:log_id", deleteLog);
logbooksRouter.delete("/log/template/:log_template_id", deleteLogTemplate);
logbooksRouter.delete("/item/:item_id", deleteItem);
logbooksRouter.delete("/item/template/:item_template_id", deleteItemTemplate);

/* --- GET --- */
logbooksRouter.get("/", getLogbooks); // logbooks.getByUser
logbooksRouter.get("/:logbook_id", getLogbook); // logbooks.getById
logbooksRouter.get("/:logbook_id/logs", getLogsByLogbook); // logs.getByLogbook
logbooksRouter.get("/:logbook_id/items", getItemsByLogbook); // items.getByLogbook
logbooksRouter.get("/:logbook_id/item/templates", getItemTemplatesByLogbook); // itemTemplates.getByLogbook
logbooksRouter.get("/:logbook_id/templates", getLogTemplatesByLogbook); // logTemplates.getByLogbook

logbooksRouter.get("/logs", getLogs); // logs.getByUser

logbooksRouter.get("/logs/:log_id/items/rows", getItemRowsByLog); // itemRows.getByLog
logbooksRouter.get("/logs/:log_id/items/:item_id/rows", getItemRowsByLogItem); // itemRows.getByLogItem

logbooksRouter.get("/templates", getLogTemplates); // logTemplates.getByUser
logbooksRouter.get("/templates/:log_template_id", getLogTemplate); // logTemplates.getById

logbooksRouter.get("/fields", getFields); // fields.getByUser

logbooksRouter.get("/items", getItems); // items.getByUser
logbooksRouter.get("/items/rows", getItemRows); // itemRows.getByUser
logbooksRouter.get("/items/rows/:item_row_id/fields", getFieldsByItemRow); // fields.getByItemRow
logbooksRouter.get("/items/templates/:item_template_id/items", getItemsByTemplate); // items.getByTemplate
logbooksRouter.get(
	"/items/templates/:item_template_id/fields/templates",
	getFieldTemplatesByItemTemplate,
); // fieldTemplates.getByItemTemplate

/* --- PUT --- */
logbooksRouter.put("/log/:log_id", putLog); // logs.put
logbooksRouter.put("/:logbook_id", putLogbook); // logbooks.put

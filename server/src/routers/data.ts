// TODO: some handlers are default exports in their files, others aren't. Make
// none of them default exports.
import deleteHabit from "@/lib/data/request-handlers/delete/delete-habit";
import { deleteItem } from "@/lib/data/request-handlers/delete/delete-item";
import { deleteItemTemplate } from "@/lib/data/request-handlers/delete/delete-item-template";
import { deleteLog } from "@/lib/data/request-handlers/delete/delete-log";
import { deleteLogTemplate } from "@/lib/data/request-handlers/delete/delete-log-template";
import { deleteLogbook } from "@/lib/data/request-handlers/delete/delete-logbook";
import getActivities from "@/lib/data/request-handlers/get/get-activities";
import { getFields } from "@/lib/data/request-handlers/get/get-fields";
import getHabitEntries from "@/lib/data/request-handlers/get/get-habit-entries";
import getHabits from "@/lib/data/request-handlers/get/get-habits";
import { getItemRows } from "@/lib/data/request-handlers/get/get-item-rows";
import { getItemTemplatesByLogbook } from "@/lib/data/request-handlers/get/get-item-templates";
import { getItems, getItemsByLogbook } from "@/lib/data/request-handlers/get/get-items";
import {
	getLogTemplates,
	getLogTemplatesByLogbook,
} from "@/lib/data/request-handlers/get/get-log-templates";
import { getLogbook, getLogbooks } from "@/lib/data/request-handlers/get/get-logbooks";
import { getLogs, getLogsByLogbook } from "@/lib/data/request-handlers/get/get-logs";
import getNotes from "@/lib/data/request-handlers/get/get-notes";
import getTags from "@/lib/data/request-handlers/get/get-tags";
import getTagsTree from "@/lib/data/request-handlers/get/get-tags-tree";
import postActivity from "@/lib/data/request-handlers/post/post-activity";
import postHabit from "@/lib/data/request-handlers/post/post-habit";
import postHabitEntry from "@/lib/data/request-handlers/post/post-habit-entry";
import { postItem } from "@/lib/data/request-handlers/post/post-item";
import { postItemRow } from "@/lib/data/request-handlers/post/post-item-row";
import { postItemTemplate } from "@/lib/data/request-handlers/post/post-item-template";
import { postLog } from "@/lib/data/request-handlers/post/post-log";
import { postLogTemplate } from "@/lib/data/request-handlers/post/post-log-template";
import { postLogbook } from "@/lib/data/request-handlers/post/post-logbook";
import postNote from "@/lib/data/request-handlers/post/post-note";
import postTag from "@/lib/data/request-handlers/post/post-tag";
import putActivity from "@/lib/data/request-handlers/put/put-activity";
import putHabitEntry from "@/lib/data/request-handlers/put/put-habit-entry";
import { putLogbook } from "@/lib/data/request-handlers/put/put-logbook";
import putTaskCompletion from "@/lib/data/request-handlers/put/put-task";
import { Router } from "express";
import { isAuthorized } from "../lib/auth/is-authorized";

export const dataRouter = Router({ mergeParams: true });
dataRouter.use(isAuthorized);

// TODO: start without error handling, work on that later
// TODO: turn every handler into a function itself, so that the router is just a
// list of testable functions

/* Activities */
dataRouter.get("/activities", getActivities);
dataRouter.post("/activity", postActivity);
dataRouter.put("/activity/:activity_id", putActivity);
dataRouter.put("/task/completion", putTaskCompletion);

/* Tags */
dataRouter.get("/tags", getTags);
dataRouter.post("/tag", postTag);

dataRouter.get("/tags/tree", getTagsTree);

/* Notes */
dataRouter.get("/notes", getNotes);
dataRouter.post("/note", postNote);

/* Habits */
dataRouter.get("/habits", getHabits);
dataRouter.post("/habit", postHabit);
dataRouter.delete("/habit/:habit_id", deleteHabit);

dataRouter.get("/habit/entries", getHabitEntries);
dataRouter.post("/habit/entry", postHabitEntry);
dataRouter.put("/habit/entry", putHabitEntry);

/* Logbooks */
// TODO: put these in logbookRouter
// TODO: I'm using more specific names for the handlers. Go over previous
// handlers and do the same for them, too.
/* --- POST --- */
dataRouter.post("/logbook", postLogbook);
dataRouter.post("/logbook/template", postLogTemplate);
dataRouter.post("/logbook/log", postLog);
dataRouter.post("/logbook/item/template", postItemTemplate);
dataRouter.post("/logbook/item/row", postItemRow);
dataRouter.post("/logbook/item", postItem);

/* --- DELETE --- */
dataRouter.delete("/logbook/log/template/:log_template_id", deleteLogTemplate);
dataRouter.delete("/logbook/log/:log_id", deleteLog);
dataRouter.delete("/logbook/item/template/:item_template_id", deleteItemTemplate);
dataRouter.delete("/logbook/item/:item_id", deleteItem);
dataRouter.delete("/logbook/:logbook_id", deleteLogbook);

/* --- GET --- */
dataRouter.get("/logbooks", getLogbooks);
dataRouter.get("/logbook/:logbook_id", getLogbook);
dataRouter.get("/logbooks/logs", getLogs);
dataRouter.get("/logbook/:logbook_id/logs", getLogsByLogbook);
dataRouter.get("/logbook/:logbook_id/items", getItemsByLogbook);
dataRouter.get("/logbook/:logbook_id/item/templates", getItemTemplatesByLogbook);
dataRouter.get("/logbook/templates", getLogTemplates);
dataRouter.get("/logbook/:logbook_id/templates", getLogTemplatesByLogbook);

dataRouter.get("/logbooks/fields", getFields);
dataRouter.get("/logbooks/items/rows", getItemRows);
dataRouter.get("/logbooks/items", getItems);

/* --- PUT --- */
dataRouter.put("/logbook/:logbook_id", putLogbook);

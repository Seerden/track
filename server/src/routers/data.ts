import { deleteHabit } from "@/lib/data/request-handlers/delete/delete-habit";
import { getActivities } from "@/lib/data/request-handlers/get/get-activities";
import { getHabitEntries } from "@/lib/data/request-handlers/get/get-habit-entries";
import { getHabits } from "@/lib/data/request-handlers/get/get-habits";
import { getNotes } from "@/lib/data/request-handlers/get/get-notes";
import { getTags } from "@/lib/data/request-handlers/get/get-tags";
import { getTagsTree } from "@/lib/data/request-handlers/get/get-tags-tree";
import { postActivity } from "@/lib/data/request-handlers/post/post-activity";
import { postHabit } from "@/lib/data/request-handlers/post/post-habit";
import { postHabitEntry } from "@/lib/data/request-handlers/post/post-habit-entry";
import { postNote } from "@/lib/data/request-handlers/post/post-note";
import { postTag } from "@/lib/data/request-handlers/post/post-tag";
import { putActivity } from "@/lib/data/request-handlers/put/put-activity";
import { putHabitEntry } from "@/lib/data/request-handlers/put/put-habit-entry";
import { putTaskCompletion } from "@/lib/data/request-handlers/put/put-task";
import { logbooksRouter } from "@/routers/data/logbooks";
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
dataRouter.use("/logbooks", logbooksRouter);

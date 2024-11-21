import deleteHabit from "@/lib/data/request-handlers/delete/delete-habit";
import getActivities from "@/lib/data/request-handlers/get/get-activities";
import getHabitEntries from "@/lib/data/request-handlers/get/get-habit-entries";
import getHabits from "@/lib/data/request-handlers/get/get-habits";
import getNotes from "@/lib/data/request-handlers/get/get-notes";
import getTags from "@/lib/data/request-handlers/get/get-tags";
import getTagsTree from "@/lib/data/request-handlers/get/get-tags-tree";
import postActivity from "@/lib/data/request-handlers/post/post-activity";
import postHabit from "@/lib/data/request-handlers/post/post-habit";
import postHabitEntry from "@/lib/data/request-handlers/post/post-habit-entry";
import postNote from "@/lib/data/request-handlers/post/post-note";
import postTag from "@/lib/data/request-handlers/post/post-tag";
import putActivity from "@/lib/data/request-handlers/put/put-activity";
import putHabitEntry from "@/lib/data/request-handlers/put/put-habit-entry";
import putTaskCompletion from "@/lib/data/request-handlers/put/put-task";
import { Router } from "express";
import { isAuthorized } from "../lib/auth/is-authorized";

export const dataRouter = Router({ mergeParams: true });

// TODO: start without error handling, work on that later
// TODO: turn every handler into a function itself, so that the router is just a
// list of testable functions

/* Activities */
dataRouter.get("/activities", isAuthorized, getActivities);
dataRouter.post("/activity", isAuthorized, postActivity);
dataRouter.put("/activity/:activity_id", isAuthorized, putActivity);
dataRouter.put("/task/completion", isAuthorized, putTaskCompletion);

/* Tags */
dataRouter.get("/tags", isAuthorized, getTags);
dataRouter.post("/tag", isAuthorized, postTag);

dataRouter.get("/tags/tree", isAuthorized, getTagsTree);

/* Notes */
dataRouter.get("/notes", isAuthorized, getNotes);
dataRouter.post("/note", isAuthorized, postNote);

/* Habits */
dataRouter.get("/habits", isAuthorized, getHabits);
dataRouter.post("/habit", isAuthorized, postHabit);
dataRouter.delete("/habit/:habit_id", isAuthorized, deleteHabit);

dataRouter.get("/habit/entries", isAuthorized, getHabitEntries);
dataRouter.post("/habit/entry", isAuthorized, postHabitEntry);
dataRouter.put("/habit/entry", isAuthorized, putHabitEntry);

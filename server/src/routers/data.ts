import { deleteHabit } from "@/lib/data/request-handlers/habits/delete-habit";
import { getHabitEntries } from "@/lib/data/request-handlers/habits/get-habit-entries";
import { getHabits } from "@/lib/data/request-handlers/habits/get-habits";
import { postHabit } from "@/lib/data/request-handlers/habits/post-habit";
import { postHabitEntry } from "@/lib/data/request-handlers/habits/post-habit-entry";
import { putHabitEntry } from "@/lib/data/request-handlers/habits/put-habit-entry";
import { getNotes } from "@/lib/data/request-handlers/notes/get-notes";
import { postNote } from "@/lib/data/request-handlers/notes/post-note";
import { getTags } from "@/lib/data/request-handlers/tags/get-tags";
import { getTagsTree } from "@/lib/data/request-handlers/tags/get-tags-tree";
import { postTag } from "@/lib/data/request-handlers/tags/post-tag";
import { activitiesRouter } from "@/routers/data/activities";
import { logbooksRouter } from "@/routers/data/logbooks";
import { Router } from "express";
import { isAuthorized } from "../lib/auth/is-authorized";

export const dataRouter = Router({ mergeParams: true });
dataRouter.use(isAuthorized);

// TODO: start without error handling, work on that later
// TODO: turn every handler into a function itself, so that the router is just a
// list of testable functions

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

dataRouter.use("/logbooks", logbooksRouter);
dataRouter.use("/activities", activitiesRouter);

import { getNotes } from "@/lib/data/request-handlers/notes/get-notes";
import { postNote } from "@/lib/data/request-handlers/notes/post-note";
import { Router } from "express";
import { isAuthorized } from "../lib/auth/is-authorized";

export const dataRouter = Router({ mergeParams: true });
dataRouter.use(isAuthorized);

// TODO: start without error handling, work on that later
// TODO: turn every handler into a function itself, so that the router is just a
// list of testable functions

/* Notes */
dataRouter.get("/notes", getNotes);
dataRouter.post("/note", postNote);

import { updateActivityCompletion } from "@lib/data/update-activity";
import { Router } from "express";
import type { ActivityInput, ActivityUpdateInput } from "../../types/data/activity.types";
import type { NoteInput } from "../../types/data/note.types";
import type { TagInput } from "../../types/data/tag.types";
import { isAuthorized } from "../lib/auth/is-authorized";
import { insertActivityWithTags } from "../lib/data/insert-activity";
import { insertNoteWithTags } from "../lib/data/insert-note";
import { insertTagWithRelation } from "../lib/data/insert-tags";
import {
	createTagTreeMap,
	getTagsWithRelations,
} from "../lib/data/merge-tags-and-relations";
import { queryActivitiesAndRelations } from "../lib/data/query-activities";
import { queryNotesAndRelations } from "../lib/data/query-notes";

export const dataRouter = Router({ mergeParams: true });

// TODO: start without error handling, work on that later
// TODO: turn every handler into a function itself, so that the router is just a
// list of testable functions

dataRouter.post("/activity", async (req, res) => {
	const { activity, tagIds } = req.body as ActivityInput;
	const insertedActivity = await insertActivityWithTags({ activity, tag_ids: tagIds });
	res.json({ activity: insertedActivity });
});

dataRouter.get("/tags", isAuthorized, async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const tagsById = await getTagsWithRelations({ user_id });
	res.json({ byId: tagsById });
});

dataRouter.post("/tag", isAuthorized, async (req, res) => {
	const { newTag, parent_id } = req.body as TagInput;
	const tag = await insertTagWithRelation({ newTag, parent_id });
	res.json({ tag });
});

dataRouter.get("/tags/tree", isAuthorized, async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const tagsById = await getTagsWithRelations({ user_id });
	const tree = createTagTreeMap(tagsById);
	res.json({ byId: tree });
});

dataRouter.get("/notes", isAuthorized, async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const notesById = await queryNotesAndRelations({ user_id });
	res.json({ byId: notesById });
});

dataRouter.post("/note", isAuthorized, async (req, res) => {
	const { note, tagIds } = req.body as NoteInput;
	const insertedNote = await insertNoteWithTags({ note, tag_ids: tagIds });
	res.json({ note: insertedNote });
});

dataRouter.get("/activities", isAuthorized, async (req, res) => {
	const user_id = req.session.user!.user_id;
	const activitiesById = await queryActivitiesAndRelations({ user_id });

	res.json({ byId: activitiesById });
});

dataRouter.put("/task/completion", isAuthorized, async (req, res) => {
	const { input } = req.body as { input: ActivityUpdateInput };
	const updatedActivity = await updateActivityCompletion({ input });
	res.json({ activity: updatedActivity });
});

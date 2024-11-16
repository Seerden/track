import { deleteHabit } from "@/lib/data/delete-habit";
import { postHabits } from "@/lib/data/insert-habit";
import { postHabitEntry } from "@/lib/data/insert-habit-entry";
import { getHabitEntriesByUser } from "@/lib/data/query-habit-entries";
import { getHabits } from "@/lib/data/query-habits";
import postActivity from "@/lib/data/request-handlers/post/post-activity";
import postNote from "@/lib/data/request-handlers/post/post-note";
import postTag from "@/lib/data/request-handlers/post/post-tag";
import { putHabitEntry } from "@/lib/data/update-habit-entry";
import { updateActivityCompletion } from "@lib/data/update-activity";
import { Router } from "express";
import type { ActivityUpdateInput } from "../../types/data/activity.types";
import { isAuthorized } from "../lib/auth/is-authorized";
import {
	createTagTreeMap,
	getTagsWithRelations,
} from "../lib/data/merge-tags-and-relations";
import {
	queryActivitiesAndRelations,
	queryActivityByIdWithRelations,
} from "../lib/data/query-activities";
import { queryNotesAndRelations } from "../lib/data/query-notes";

export const dataRouter = Router({ mergeParams: true });

// TODO: start without error handling, work on that later
// TODO: turn every handler into a function itself, so that the router is just a
// list of testable functions

dataRouter.post("/activity", isAuthorized, postActivity);

dataRouter.get("/tags", isAuthorized, async (req, res) => {
	const user_id = req.session.user!.user_id; // always exists if we're here, because of middleware
	const tagsById = await getTagsWithRelations({ user_id });
	res.json({ byId: tagsById });
});

dataRouter.post("/tag", isAuthorized, postTag);

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

dataRouter.post("/note", isAuthorized, postNote);

dataRouter.get("/activities", isAuthorized, async (req, res) => {
	const user_id = req.session.user!.user_id;
	const activitiesById = await queryActivitiesAndRelations({ user_id });

	res.json({ byId: activitiesById });
});

dataRouter.put("/task/completion", isAuthorized, async (req, res) => {
	const { input } = req.body as { input: ActivityUpdateInput };
	const [activity] = await updateActivityCompletion({ input });
	const updatedActivity = await queryActivityByIdWithRelations({
		activity_id: activity.activity_id,
	});
	res.json(updatedActivity);
});

dataRouter.get("/habits", isAuthorized, getHabits);
dataRouter.post("/habit", isAuthorized, postHabits);
dataRouter.post("/habit/entry", isAuthorized, postHabitEntry);
dataRouter.get("/habit/entries", isAuthorized, getHabitEntriesByUser);
dataRouter.put("/habit/entry", isAuthorized, putHabitEntry);
dataRouter.delete("/habit/:habit_id", isAuthorized, deleteHabit);

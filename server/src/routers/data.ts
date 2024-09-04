import { Router } from "express";
import { NewActivity } from "../../types/data/activity.types";
import { isAuthorized } from "../helpers/auth/is-authorized";
import { insertActivity } from "../helpers/data/insert-activity";
import { getTagsWithRelations } from "../helpers/data/merge-tags-and-relations";

export const dataRouter = Router({ mergeParams: true });

/** WIP -- start without error handling, work on that later */
dataRouter.post("/activity", async (req, res) => {
	const { newActivity } = req.body as { newActivity: NewActivity };

	const activity = await insertActivity({ newActivity });

	res.json({ activity });
});

dataRouter.get("/tags", isAuthorized, async (req, res) => {
	const user_id = req.session.user?.user_id!; // always exists if we're here, because of middleware

	const tagsById = await getTagsWithRelations({ user_id });

	res.json({ tagsById });
});

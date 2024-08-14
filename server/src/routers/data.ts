import { Router } from "express";
import { NewActivity } from "../../types/data/activity.types";
import { insertActivity } from "../helpers/data/insert-activity";

export const dataRouter = Router({ mergeParams: true });

/** WIP -- start without error handling, work on that later */
dataRouter.post("/activity", async (req, res) => {
	const { newActivity } = req.body as { newActivity: NewActivity };

	const activity = await insertActivity({ newActivity });

	res.json({ activity });
});

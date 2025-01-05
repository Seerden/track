import { updateOccurrence } from "@/lib/data/models/activities/update-occurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { OccurrenceInput } from "@shared/types/data/recurrence.types";

export const putOccurrence: RequestHandlerWithUserId = async ({ req, res }, user_id) => {
	const { occurrence } = req.body as OccurrenceInput;

	res.json(await updateOccurrence({ occurrence, user_id }));
};

import { removeOccurrenceById } from "@/lib/data/models/activities/remove-occurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";

// TODO: business logic
export const deleteOccurrence: RequestHandlerWithUserId = async (
	{ req, res },
	user_id,
) => {
	const occurrence_id = req.params.occurrence_id;

	res.json(await removeOccurrenceById({ occurrence_id, user_id }));
};

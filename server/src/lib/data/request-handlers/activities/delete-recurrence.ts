import { removeRecurrenceById } from "@/lib/data/models/activities/remove-recurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";

// TODO: business logic
export const deleteRecurrence: RequestHandlerWithUserId = async (
	{ req, res },
	user_id,
) => {
	const recurrence_id = req.params.recurrence_id;

	res.json(await removeRecurrenceById({ recurrence_id, user_id }));
};

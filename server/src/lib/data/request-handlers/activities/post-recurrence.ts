import { createRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { CreateRecurrenceInput } from "@shared/types/data/recurrence.types";

// TODO: business logic
export const postRecurrence: RequestHandlerWithUserId = async ({ req, res }, user_id) => {
	const { newRecurrence, activity_id } = req.body as CreateRecurrenceInput;

	res.json(
		await createRecurrence({
			newRecurrence,
			user_id,
			activity_id,
		}),
	);
};

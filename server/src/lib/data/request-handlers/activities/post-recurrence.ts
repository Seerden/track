import { insertRecurrence } from "@/lib/data/models/activities/insert-recurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { NewRecurrenceInput } from "@shared/types/data/recurrence.types";

// TODO: business logic
export const postRecurrence: RequestHandlerWithUserId = async ({ req, res }, user_id) => {
	const { newRecurrence } = req.body as NewRecurrenceInput;

	res.json(
		await insertRecurrence({
			newRecurrence,
			user_id,
		}),
	);
};

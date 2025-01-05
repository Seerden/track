import { insertOccurrence } from "@/lib/data/models/activities/insert-occurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { NewOccurrenceInput } from "@shared/types/data/recurrence.types";

// TODO: business logic
export const postOccurrence: RequestHandlerWithUserId = async ({ req, res }, user_id) => {
	const { newOccurrence } = req.body as NewOccurrenceInput;

	res.json(
		await insertOccurrence({
			newOccurrence,
			user_id,
		}),
	);
};

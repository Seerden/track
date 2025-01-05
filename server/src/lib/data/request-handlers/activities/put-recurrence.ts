import { updateRecurrence } from "@/lib/data/models/activities/update-recurrence";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";
import type { RecurrenceInput } from "@shared/types/data/recurrence.types";

// putRecurrence
export const putRecurrence: RequestHandlerWithUserId = async ({ req, res }, user_id) => {
	const { recurrence } = req.body as RecurrenceInput;

	res.json(await updateRecurrence({ recurrence, user_id }));
};

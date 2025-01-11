import {
	queryRecurrenceByActivity,
	queryRecurrencesByUser,
} from "@/lib/data/models/activities/query-recurrences";
import { groupById } from "@/lib/data/models/group-by-id";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";

// TODO: allow GET recurrences with their initial activity (use a query param)
// TODO: handler to GET the activity that is the "template" for a recurrence

export const getRecurrencesByUser: RequestHandlerWithUserId = async (
	{ res },
	user_id,
) => {
	const recurrences = await queryRecurrencesByUser({ user_id });
	res.json({
		byId: groupById(recurrences, "recurrence_id"),
	});
};

export const getRecurrenceByActivity: RequestHandlerWithUserId = async (
	{ req, res },
	user_id,
) => {
	const activity_id = req.params.activity_id;

	const recurrence = await queryRecurrenceByActivity({ activity_id, user_id });
	res.json({
		recurrence,
	});
};

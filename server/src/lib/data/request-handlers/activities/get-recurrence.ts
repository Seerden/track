import {
	queryRecurrenceByActivity,
	queryRecurrencesByUser,
} from "@/lib/data/models/activities/query-recurrences";
import { groupById } from "@/lib/data/models/group-by-id";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";

export const getRecurrencesByUser: RequestHandlerWithUserId = async (
	{ req, res },
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

	const recurrences = await queryRecurrenceByActivity({ activity_id, user_id });
	res.json({
		byId: groupById(recurrences, "recurrence_id"),
	});
};

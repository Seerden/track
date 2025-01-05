import {
	queryOccurrencesByRecurrence,
	queryOccurrencesByUser,
} from "@/lib/data/models/activities/query-occurrences";
import { groupById } from "@/lib/data/models/group-by-id";
import type { RequestHandlerWithUserId } from "@/lib/data/request-handlers/wrap-with-user-id";

export const getOccurrencesByUser: RequestHandlerWithUserId = async (
	{ req, res },
	user_id,
) => {
	const occurrences = await queryOccurrencesByUser({ user_id });
	res.json({
		byId: groupById(occurrences, "occurrence_id"),
	});
};

export const getOccurrencesByRecurrence: RequestHandlerWithUserId = async (
	{ req, res },
	user_id,
) => {
	const recurrence_id = req.params.recurrence_id;

	const occurrences = await queryOccurrencesByRecurrence({ recurrence_id, user_id });
	res.json({
		byId: groupById(occurrences, "occurrence_id"),
	});
};

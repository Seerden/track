import {
	queryOccurrencesByRecurrence,
	queryOccurrencesByUser,
} from "@/lib/data/models/activities/query-occurrences";
import {
	queryRecurrenceByActivity,
	queryRecurrencesByUser,
} from "@/lib/data/models/activities/query-recurrences";
import { groupById } from "@/lib/data/models/group-by-id";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { z } from "@shared/lib/zod";

export const _queryOccurrencesByUser = authenticatedProcedure.query(
	async ({ ctx: { req } }) => {
		return await queryOccurrencesByUser({
			user_id: req.session.user.user_id,
		});
	},
);

export const _queryOccurrencesByRecurrence = authenticatedProcedure
	.input(z.string())
	.query(async ({ input, ctx: { req } }) => {
		return await queryOccurrencesByRecurrence({
			recurrence_id: input,
			user_id: req.session.user.user_id,
		});
	});

export const _getRecurrencesByUser = authenticatedProcedure.query(async ({ ctx }) => {
	return groupById(
		await queryRecurrencesByUser({ user_id: ctx.req.session.user.user_id }),
		"recurrence_id",
	);
});

export const _getRecurrenceByActivity = authenticatedProcedure
	.input(z.string())
	.query(async ({ input, ctx }) => {
		return await queryRecurrenceByActivity({
			activity_id: input,
			user_id: ctx.req.session.user.user_id,
		});
	});

import {
	queryOccurrencesByRecurrence,
	queryOccurrencesByUser,
} from "@/lib/data/models/activities/query-occurrences";
import {
	queryRecurrenceByActivity,
	queryRecurrencesById,
	queryRecurrencesByUser,
} from "@/lib/data/models/activities/query-recurrences";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { groupById } from "@shared/lib/map";
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
	.input(
		z.union([
			z.object({
				activity_id: z.string(),
				synthetic_id: z.null(),
			}),
			z.object({
				activity_id: z.null(),
				synthetic_id: z.string(),
			}),
		]),
	)
	.query(async ({ input, ctx }) => {
		return await queryRecurrenceByActivity({
			...input,
			user_id: ctx.req.session.user.user_id,
		});
	});

export const getRecurrencesById = authenticatedProcedure
	.input(z.object({ recurrence_ids: z.array(z.string()) }))
	.query(async ({ input, ctx }) => {
		return queryRecurrencesById({
			user_id: ctx.req.session.user.user_id,
			recurrence_ids: input.recurrence_ids,
		});
	});

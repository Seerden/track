import { groupById } from "@shared/lib/map";
import { z } from "@shared/lib/zod";
import {
	queryOccurrencesByRecurrence,
	queryOccurrencesByUser,
} from "@/lib/data/models/activities/query-occurrences";
import {
	queryRecurrenceByActivity,
	queryRecurrencesById,
	queryRecurrencesByUser,
} from "@/lib/data/models/activities/query-recurrences";
import { betterAuthProcedure } from "@/lib/trpc/procedures/authenticated.procedure";

export const _queryOccurrencesByUser = betterAuthProcedure.query(
	async ({ ctx }) => {
		return await queryOccurrencesByUser({
			user_id: ctx.user.id,
		});
	}
);

export const _queryOccurrencesByRecurrence = betterAuthProcedure
	.input(z.string())
	.query(async ({ input, ctx }) => {
		return await queryOccurrencesByRecurrence({
			recurrence_id: input,
			user_id: ctx.user.id,
		});
	});

export const _getRecurrencesByUser = betterAuthProcedure.query(
	async ({ ctx }) => {
		return groupById(
			await queryRecurrencesByUser({ user_id: ctx.user.id }),
			"recurrence_id"
		);
	}
);

export const _getRecurrenceByActivity = betterAuthProcedure
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
		])
	)
	.query(async ({ input, ctx }) => {
		return await queryRecurrenceByActivity({
			...input,
			user_id: ctx.user.id,
		});
	});

export const getRecurrencesById = betterAuthProcedure
	.input(z.object({ recurrence_ids: z.array(z.string()) }))
	.query(async ({ input, ctx }) => {
		return queryRecurrencesById({
			user_id: ctx.user.id,
			recurrence_ids: input.recurrence_ids,
		});
	});

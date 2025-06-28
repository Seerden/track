import { insertHabitWithTags } from "@/lib/data/models/habits/insert-habit";
import { insertHabitEntry } from "@/lib/data/models/habits/insert-habit-entry";
import { authenticatedProcedure } from "@/lib/trpc/procedures/authenticated.procedure";
import { z } from "zod";

// matches IntervalUnit
export const intervalUnitSchema = z.enum(["day", "week", "month", "year"]);

export const newHabitSchema = z.object({
	user_id: z.string(),
	name: z.string(),
	description: z.string(),
	start_timestamp: z.string(), // Timestamp, actually
	end_timestamp: z.string().nullable(), // Timestamp, actually
	interval: z.number(),
	frequency: z.number(),
	interval_unit: intervalUnitSchema,
	goal_type: z.enum(["checkbox", "goal"]),
	goal_unit: z.string().nullable(),
	goal: z.number().nullable(),
});

// matches HabitInput
export const habitInputSchema = z.object({
	habit: newHabitSchema,
	tagIds: z.array(z.string()).optional(),
});

// matches NewHabitEntry
export const habitEntryInputSchema = z.object({
	habit_id: z.string(),
	// TODO: take this out, get it from context
	user_id: z.string(),
	date: z.string(), // Timestamp, actually
	index: z.number(),
	value: z.string(), // Varchar
});

export const createHabitEntry = authenticatedProcedure
	.input(habitEntryInputSchema)
	.mutation(async ({ input }) => {
		// TODO: call the input "input"
		return await insertHabitEntry({ habitEntry: input });
	});

export const createHabit = authenticatedProcedure
	.input(habitInputSchema)
	.mutation(async ({ input: { habit, tagIds } }) => {
		const habitWithTags = await insertHabitWithTags({ habit, tagIds });
	});

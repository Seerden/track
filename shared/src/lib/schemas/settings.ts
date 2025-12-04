import { z } from "../zod";
import { userSchema } from "./user";

export const HABIT_FILTER = {
	ALL: "all",
	TODAY: "completed-today",
	INTERVAL: "completed-interval",
} as const;

export const habitFilterValueSchema = z.enum(Object.values(HABIT_FILTER));

export const TASK_FILTER = {
	ALL: "all",
	COMPLETED: "completed",
} as const;

export const taskFilterValueSchema = z.enum(Object.values(TASK_FILTER));

export const userSettingsSchema = z.object({
	user_id: userSchema.shape.user_id,
	disable_notifications: z.boolean().nullable(),
	default_task_completion_filter: taskFilterValueSchema.nullable(),
	default_habit_completion_filter: habitFilterValueSchema.nullable(),
});
export type UserSettings = z.infer<typeof userSettingsSchema>;

export const booleanUserSettingsSchema = userSettingsSchema.pick({
	disable_notifications: true,
});
export const enumUserSettingsSchema = userSettingsSchema.pick({
	default_habit_completion_filter: true,
	default_task_completion_filter: true,
});
export type BooleanUserSettings = z.infer<typeof booleanUserSettingsSchema>;

export const userSettingsUpdateInputSchema = booleanUserSettingsSchema
	.partial()
	.and(enumUserSettingsSchema.partial());
export type UserSettingsUpdateInput = z.infer<
	typeof userSettingsUpdateInputSchema
>;

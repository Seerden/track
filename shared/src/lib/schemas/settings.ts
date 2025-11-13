import { z } from "../zod";
import { userSchema } from "./user";

export const userSettingsSchema = z.object({
	user_id: userSchema.shape.user_id,
	disable_notifications: z.boolean().nullable(),
});
export type UserSettings = z.infer<typeof userSettingsSchema>;

export const booleanUserSettingsSchema = userSettingsSchema.pick({
	disable_notifications: true,
});
export type BooleanUserSettings = z.infer<typeof booleanUserSettingsSchema>;

export const userSettingsUpdateInputSchema =
	booleanUserSettingsSchema.partial();
export type UserSettingsUpdateInput = z.infer<
	typeof userSettingsUpdateInputSchema
>;

import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { z } from "@shared/lib/zod";

export const newUserSchema = z.object({
	username: z.string(),
	password: z.string(),
	email: z.email(),
});
export type NewUser = z.infer<typeof newUserSchema>;

export const userInputSchema = newUserSchema
	.omit({
		password: true,
	})
	.extend({
		password_hash: z.string(),
	});
export type UserInput = z.infer<typeof userInputSchema>;

export const userSchema = userInputSchema.extend({
	user_id: z.string(),
	created_at: timestampSchema,
});
export type User = z.infer<typeof userSchema>;

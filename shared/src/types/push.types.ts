import { timestampSchema } from "@shared/lib/schemas/timestamp";
import { userSchema } from "@shared/lib/schemas/user";
import { z } from "@shared/lib/zod";

export const pushSubscriptionInputSchema = z.object({
	endpoint: z.url().optional(),
	keys: z
		.object({
			p256dh: z.string(),
			auth: z.string(),
		})
		.optional(),
	expirationTime: z.number().nullable(),
});

// Matches the shape of the `push_subscriptions` table.
export const pushSubscriptionSchema = z.object({
	user_id: userSchema.shape.user_id,
	push_subscription_id: z.string(),
	push_subscription: pushSubscriptionInputSchema,
	created_at: timestampSchema,
});

export const createPushSubscriptionInputSchema = pushSubscriptionSchema.omit({
	push_subscription_id: true,
	created_at: true,
});

export type PushSubscription = z.infer<typeof pushSubscriptionSchema>;
export type PushSubscriptionInput = z.infer<typeof pushSubscriptionInputSchema>;
export type CreatePushSubscriptionInput = z.infer<
	typeof createPushSubscriptionInputSchema
>;

export const pushSubscriptionChangeInputSchema = z.object({
	old_endpoint: z.string().nullable(),
	new_endpoint: z.string(),
	new_p256dh: z.string(),
	new_auth: z.string(),
});
export type PushSubscriptionChangeInput = z.infer<
	typeof pushSubscriptionChangeInputSchema
>;

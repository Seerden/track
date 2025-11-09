import { captureException } from "@sentry/node";
import {
	type PushSubscription,
	pushSubscriptionInputSchema,
} from "@shared/types/push.types";
import { sqlConnection } from "@/db/init";
import { insertPushSubscription } from "@/lib/data/models/push/insert-push-subscription";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

// This is an auth procedure, because we only provide push notifications for
// authenticated users.
export const subscribeResolver = authenticatedProcedure
	.input(pushSubscriptionInputSchema)
	.mutation(async ({ input, ctx }) => {
		try {
			// check if user_id/endpoint already exists
			const existing = await sqlConnection<PushSubscription[]>`
            select * from push_subscriptions
            where user_id = ${ctx.req.session.user.user_id}
         `;

			if (
				existing.some(
					(sub) => sub.push_subscription.endpoint === input.endpoint
				)
			) {
				console.info("User is already subscribed.");
				return;
			}

			await insertPushSubscription({
				user_id: ctx.req.session.user.user_id,
				push_subscription: input,
			});

			return;
		} catch (error) {
			console.error(error);
			captureException(error, {
				level: "error",
			});
		}
	});

import { captureException } from "@sentry/node";
import { queryPushSubscriptionsByUser } from "@/lib/data/models/push/query-push-subscriptions";
import { betterAuthProcedure } from "../../procedures/authenticated.procedure";

// This is an auth procedure, because we only provide push notifications for
// authenticated users.
export const pushSubscriptionQuery = betterAuthProcedure.query(
	async ({ ctx }) => {
		try {
			return await queryPushSubscriptionsByUser({
				user_id: ctx.user.id,
			});
		} catch (error) {
			console.error(error);
			captureException(error, {
				level: "error",
			});
		}
	}
);

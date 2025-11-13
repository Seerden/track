import { captureException } from "@sentry/node";
import { sqlConnection } from "@/db/init";
import { queryPushSubscriptionsByUser } from "@/lib/data/models/push/query-push-subscriptions";
import { authenticatedProcedure } from "../../procedures/authenticated.procedure";

// This is an auth procedure, because we only provide push notifications for
// authenticated users.
export const queryPushSubscriptionResolver = authenticatedProcedure.query(
	async ({ ctx }) => {
		try {
			return await queryPushSubscriptionsByUser({
				sql: sqlConnection,
				user_id: ctx.req.session.user.user_id,
			});
		} catch (error) {
			console.error(error);
			captureException(error, {
				level: "error",
			});
		}
	}
);

import type { PushSubscription } from "@shared/types/push.types";
import { TABLES } from "types/tables";
import type { PushSubscription as Pushsub } from "web-push";
import webpush, { WebPushError } from "web-push";
import { sqlConnection } from "@/db/init";

export async function sendTestNotification() {
	const subscriptions = await sqlConnection<[PushSubscription?]>`
      select * from ${sqlConnection(TABLES.PUSH_SUBSCRIPTIONS)}
   `;

	for (const sub of subscriptions) {
		const subscription = sub?.push_subscription;

		if (!subscription?.endpoint) {
			return;
		}

		// TODO: when we send a notification and receive a 410 error
		// (expired/unsubscribed), reset permission client-side, because we can't
		// regenerate it server-side.
		try {
			const notification = await webpush.sendNotification(
				subscription as Pushsub,
				JSON.stringify({
					title: "test notification",
					body: "This is a test notification from Track!",
				})
			);
			if (notification) {
				console.info({ notification });
			}
		} catch (error) {
			if (error instanceof WebPushError) {
				console.error(error);
				// delete subscription if it's no longer valid
				await sqlConnection`
               delete from ${sqlConnection(TABLES.PUSH_SUBSCRIPTIONS)}
               where push_subscription_id = ${sub.push_subscription_id}
            `;
			}
		}
	}

	return {
		success: true,
	};
}

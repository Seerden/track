import type { PushSubscription } from "@shared/types/push.types";
import { TABLES } from "types/tables";
import type { PushSubscription as Pushsub } from "web-push";
import webpush from "web-push";
import { sqlConnection } from "@/db/init";

export async function sendTestNotification() {
	const subscriptions = await sqlConnection<[PushSubscription?]>`
      select * from ${sqlConnection(TABLES.PUSH_SUBSCRIPTIONS)}
   `;

	const first = subscriptions[0];

	const subscription = first?.push_subscription;

	if (!subscription?.endpoint) {
		return;
	}

	const notification = await webpush.sendNotification(
		subscription as Pushsub,
		JSON.stringify({
			title: "test notification",
			body: "This is a test notification from Track!",
		})
	);
	return {
		success: true,
		notification,
	};
}

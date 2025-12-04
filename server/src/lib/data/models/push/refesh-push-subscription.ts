import type {
	PushSubscription,
	PushSubscriptionChangeInput,
} from "@shared/types/push.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

/**
 * This handles the service worker's pushsubscriptionchange event, which occurs
 * when e.g. the existing push subscription expires. AFAIK, this never happens
 * on Chrome, at least.
 * @todo/@note this thing is called from a service worker. do those have auth state?
 */
export const refreshPushSubscription = query(
	async (sql, { input }: { input: PushSubscriptionChangeInput }) => {
		const [subscription] = await sql<[PushSubscription]>`
         update ${sql(TABLES.PUSH_SUBSCRIPTIONS)}
         set
            push_subscription = jsonb_set(push_subscription, '{endpoint}', to_jsonb(${input.new_endpoint}::text), true),
            push_subscription = jsonb_set(push_subscription, '{keys,p256dh}', to_jsonb(${input.new_p256dh}::text), true),
            push_subscription = jsonb_set(push_subscription, '{keys,auth}', to_jsonb(${input.new_auth}::text), true)
         where
            push_subscription ->> 'endpoint' = ${input.old_endpoint}
         returning *
      `;

		return subscription;
	}
);

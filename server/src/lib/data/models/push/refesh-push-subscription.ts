import type { PushSubscription } from "@shared/types/push.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";
import type { PushSubscriptionChangeInput } from "@/routers/push";

/**
 * This handles the service worker's pushsubscriptionchange event, which occurs
 * when e.g. the existing push subscription expires. AFAIK, this never happens
 * on Chrome, at least.
 * @todo/@note this thing is called from a service worker. do those have auth state?
 */
export const refreshPushSubscription: QueryFunction<
	{ input: PushSubscriptionChangeInput },
	Promise<PushSubscription>
> = async ({ sql = sqlConnection, input }) => {
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
};

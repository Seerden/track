import type {
	CreatePushSubscriptionInput,
	PushSubscription,
} from "@shared/types/push.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

export const insertPushSubscription = query(
	async (sql, pushSubscription: CreatePushSubscriptionInput) => {
		const inserted = await sql<PushSubscription[]>`
      insert into ${sql(TABLES.PUSH_SUBSCRIPTIONS)}
      ${sql(pushSubscription)}
      returning *
   `;

		if (!(inserted?.length === 1)) {
			throw new Error("Failed to insert a single pushSubscription.");
		}

		return inserted[0];
	}
);

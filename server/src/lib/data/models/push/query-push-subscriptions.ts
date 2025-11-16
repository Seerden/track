import type { PushSubscription } from "@shared/types/push.types";
import { TABLES } from "types/tables";
import { query } from "@/lib/query-function";

export const queryPushSubscriptionsByUser = query(
	async (sql, { user_id }: { user_id: string }) => {
		return await sql<PushSubscription[]>`
         select * from ${sql(TABLES.PUSH_SUBSCRIPTIONS)}
         where user_id = ${user_id}
      `;
	}
);

import type { PushSubscription } from "@shared/types/push.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

export const queryPushSubscriptionsByUser: QueryFunction<
	{ user_id: string },
	Promise<PushSubscription[]>
> = async ({ sql = sqlConnection, user_id }) => {
	return await sqlConnection<PushSubscription[]>`
      select * from ${sqlConnection(TABLES.PUSH_SUBSCRIPTIONS)}
      where user_id = ${user_id}
   `;
};

import type {
	CreatePushSubscriptionInput,
	PushSubscription,
} from "@shared/types/push.types";
import type { QueryFunction } from "types/sql.types";
import { TABLES } from "types/tables";
import { sqlConnection } from "@/db/init";

export const insertPushSubscription: QueryFunction<
	CreatePushSubscriptionInput,
	Promise<PushSubscription>
> = async ({ sql = sqlConnection, ...pushSubscription }) => {
	const inserted = await sql<PushSubscription[]>`
      insert into ${sql(TABLES.PUSH_SUBSCRIPTIONS)}
      ${sql(pushSubscription)}
      returning *
   `;

	if (!(inserted?.length === 1)) {
		throw new Error("Failed to insert a single pushSubscription.");
	}

	return inserted[0];
};

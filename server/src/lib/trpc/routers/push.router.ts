import { pushSubscriptionQuery } from "@/lib/trpc/resolvers/push/query-push-subscription";
import { subscribeMutation } from "../resolvers/push/subscribe";
import { testNotificationQuery } from "../resolvers/push/test-notification";
import { t } from "../trpc-context";

export const pushRouter = t.router({
	subscribe: subscribeMutation,
	testNotification: testNotificationQuery,
	subscription: pushSubscriptionQuery,
});

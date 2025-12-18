import { pushSubscriptionQuery } from "@/lib/trpc/resolvers/push/query-push-subscription.resolver";
import { subscribeMutation } from "../resolvers/push/subscribe.resolver";
import { testNotificationQuery } from "../resolvers/push/test-notification.resolver";
import { t } from "../trpc-context";

export const pushRouter = t.router({
	subscribe: subscribeMutation,
	testNotification: testNotificationQuery,
	subscription: pushSubscriptionQuery,
});

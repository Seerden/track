import { subscribeResolver } from "../resolvers/push/subscribe.resolver";
import { testNotification } from "../resolvers/push/test-notification.resolver";
import { t } from "../trpc-context";

export const pushRouter = t.router({
	subscribe: subscribeResolver,
	testNotification,
});

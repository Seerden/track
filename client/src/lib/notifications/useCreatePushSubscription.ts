import { pushSubscriptionInputSchema } from "@shared/types/push.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { trpc } from "../trpc";
import { maybeCreatePushSubscription } from "./create-push-subscription";

/** This hook manages creation of push subscriptions.
 * If the user wasn't asked to allow notifications yet on this device, they will
 * be asked once. If permission is not given, we don't do anything, and on
 * subsequent calls of this, we still won't do anything. If a user does give
 * permission, we create a notification subscription in the service worker, and
 * insert that into the database. In case of `endpoint` conflict (which the
 * service worker uses to send the actual notifications), we don't insert
 * anything.
 * @usage call this hook on application mount. Perhaps we could also add a
 * settings thing somewhere, with a button to re-trigger the notification
 * permission request and this mutation. */
export function useCreatePushSubscription() {
	const { isLoggedIn } = useAuthentication();
	const queryClient = useQueryClient();
	const { mutate } = useMutation(trpc.push.m.subscribe.mutationOptions());
	const [handled, setHandled] = useState(false);

	async function handleCreatePushSubscription() {
		const subscription = await maybeCreatePushSubscription();

		if (!subscription || handled) {
			return;
		}

		mutate(pushSubscriptionInputSchema.parse(subscription.toJSON()), {
			onSuccess: (data) => {
				queryClient.invalidateQueries({
					queryKey: trpc.push.q.subscription.queryKey(),
				});
				// TODO (TRK-139): show a notification like "You will now receive
				// push notifications. We will only send these to remind you of
				// activities, and only when you've opted into those reminders."
				if (data) {
					// TODO (TRK-139): instead of client-side, do this as a sentry
					// log on the server
					console.log({
						message: "database registered a new push subscription",
						data,
					});
				}
				setHandled(true);
				return;
			},
			onError: async () => {
				// TODO: sentry? UI message? log?
				await subscription.unsubscribe();
			},
		});
	}

	useEffect(() => {
		if (!handled && isLoggedIn) {
			handleCreatePushSubscription();
		}
	}, [isLoggedIn, handled]);

	return { handleCreatePushSubscription };
}

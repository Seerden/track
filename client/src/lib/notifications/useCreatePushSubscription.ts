import { pushSubscriptionInputSchema } from "@shared/types/push.types";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "../trpc";
import { maybeCreatePushSubscription } from "./create-push-subscription";

// TODO: this thing is WIP.
export function useCreatePushSubscription() {
	const { mutate } = useMutation(trpc.push.subscribe.mutationOptions());

	async function handleCreatePushSubscription() {
		const subscription = await maybeCreatePushSubscription();

		if (!subscription) {
			console.log("No subscription found.");
			return;
		}

		mutate(pushSubscriptionInputSchema.parse(subscription.toJSON()), {
			onSuccess: () => {
				// TODO: show a notification like "You will now receive push
				// notifications. We will only send these to remind you of
				// activities, and only when you've opted into those reminders."
				return;
			},
			onError: async () => {
				// TODO: sentry? UI message? log?
				await subscription.unsubscribe();
			},
		});
	}

	return { handleCreatePushSubscription };
}

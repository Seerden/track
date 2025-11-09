import { pushSubscriptionInputSchema } from "@shared/types/push.types";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "../trpc";
import { maybeCreatePushSubscription } from "./create-push-subscription";

export function useCreatePushSubscription() {
	const { mutate } = useMutation(trpc.push.subscribe.mutationOptions());

	async function handleCreatePushSubscription() {
		const subscription = await maybeCreatePushSubscription();

		if (!subscription) {
			return;
		}

		mutate(pushSubscriptionInputSchema.parse(subscription.toJSON()), {
			onSuccess: () => {
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

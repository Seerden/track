import { pushSubscriptionChangeInputSchema } from "@shared/types/push.types";
import { Router } from "express";
import { refreshPushSubscription } from "@/lib/data/models/push/refesh-push-subscription";

export const pushRouter = Router({ mergeParams: true });

pushRouter.post("/subscriptionchange", async (req, res) => {
	const parseInput = pushSubscriptionChangeInputSchema.safeParse(req.body);

	if (!parseInput.success) {
		console.log({ parseError: parseInput.error });
		// successful, but unhandled
		return res.status(200).json({
			success: false,
			message: "invalid input",
		});
	}

	const updatedSubscription = await refreshPushSubscription({
		input: parseInput.data,
	});

	if (!updatedSubscription) {
		return res.status(500).json({
			success: false,
			message: "failed to update push subscription",
		});
	}

	return res.status(200).json({
		success: true,
		message: "push subscription updated",
	});
});

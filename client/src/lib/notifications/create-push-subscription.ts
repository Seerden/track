import { captureException } from "@sentry/react";
import { requestPermission } from "./get-notification-permission";

/**
 * Utility function to convert VAPID key from a base64 string to a Uint8 array.
 * I adapted this from the web-push github:
 * @see https://github.com/web-push-libs/web-push/blob/bcd83623e807f41008a129c72030c143e40d0105/test/data/demo/index.html#L11
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+") // Convert URL-safe '-' to standard '+'
		.replace(/_/g, "/"); // Convert URL-safe '_' to standard '/'

	const rawData = window.atob(base64);

	return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
}

export async function maybeCreatePushSubscription() {
	const permission = await requestPermission();
	if (permission === "granted") {
		return await createPushSubscription();
	}
}

/** Make the service worker call pushManager.subscribe. */
export async function createPushSubscription() {
	const worker = await navigator.serviceWorker.ready;

	try {
		const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
		if (!vapidPublicKey) {
			throw new Error("No VAPID public key found in vite env.");
		}
		// const applicationServerKeyBuffer = Buffer.from(
		// 	urlBase64ToUint8Array(vapidPublicKey)
		// );

		// subscribe the push manager
		const subscription = await worker.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: vapidPublicKey,
		});

		return subscription;
	} catch (error) {
		// alert in UI and send a sentry message
		captureException(error, {
			level: "error",
		});
	}
}

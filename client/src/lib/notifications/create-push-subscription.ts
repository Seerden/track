import { captureException } from "@sentry/react";
import type { Maybe } from "@shared/types/data/utility.types";
import { requestPermission } from "./get-notification-permission";

/**
 * Utility function to convert VAPID key from a base64 string to a Uint8 array.
 * I adapted this from the web-push github:
 * @see https://github.com/web-push-libs/web-push/blob/bcd83623e807f41008a129c72030c143e40d0105/test/data/demo/index.html#L11
 */
function urlBase64ToUint8Array(base64String: string): Maybe<Uint8Array> {
	try {
		const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding)
			.replace(/-/g, "+") // Convert URL-safe '-' to standard '+'
			.replace(/_/g, "/"); // Convert URL-safe '_' to standard '/'

		const rawData = window.atob(base64);

		return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
	} catch (error) {
		console.error({
			error,
			base64String,
			publicKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
		});
		return;
	}
}

/** If permission is not denied, create a push subscription. */
export async function maybeCreatePushSubscription() {
	const existingPermission = Notification.permission;
	if (existingPermission === "denied") return;

	let permission: null | typeof Notification.permission = null;
	if (existingPermission === "default") {
		permission = await requestPermission();
	}

	if (existingPermission === "granted" || permission === "granted") {
		return await createPushSubscription();
	} else {
		return await maybeRevokePushSubscription();
	}
}

/** If an existing push subscription exists, revoke it. */
export async function maybeRevokePushSubscription() {
	try {
		const permission = Notification.permission;

		if (permission === "granted") return;

		const worker = await navigator.serviceWorker.ready;

		if (!worker) {
			captureException(
				"No service worker found when attempting to revokePushSubscription",
				{ level: "warning" }
			);
			return;
		}

		const subscription = await getExistingPushSubscription();
		if (subscription) {
			await subscription.unsubscribe();
		}
	} catch (error) {
		captureException(error, {
			extra: {
				function: "revokePushSubscription",
			},
			level: "error",
		});
	}
}

export async function getExistingPushSubscription() {
	const worker = await navigator.serviceWorker.ready;

	if (!worker) return;

	try {
		const subscription = await worker.pushManager.getSubscription();
		return subscription;
	} catch (error) {
		captureException(error, {
			extra: {
				function: "getExistingPushSubscription",
			},
			level: "error",
		});
	}
}

// TODO: check existing subscription using worker.pushManager.getSubscription().
// If it already exists, do not attempt to create a new one.

/** Make the service worker call pushManager.subscribe. */
export async function createPushSubscription() {
	const worker = await navigator.serviceWorker.ready;
	if (!worker) return;

	try {
		const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
		if (!vapidPublicKey) {
			throw new Error("No VAPID public key found in vite env.");
		}

		const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

		if (!applicationServerKey?.length) {
			throw new Error("Missing (VAPID) applicationServerKey");
		}

		const subscription = await worker.pushManager.subscribe({
			userVisibleOnly: true,
			// @ts-ignore typing is weird, but the urlBase64 helper is lifted
			// directly from the web-push repo, so it works fine.
			applicationServerKey,
		});

		return subscription;
	} catch (error) {
		captureException(error, {
			level: "error",
		});
	}
}

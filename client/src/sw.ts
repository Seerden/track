/// <reference lib="webworker" />

/** This is the service worker we need to be able to use the push notifications API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Push_API
 * @note see TRK-139
 */

// This is needed for TypeScript to recognize SW globals
declare const self: ServiceWorkerGlobalScope;

// This import is special.
// It's a placeholder that vite-plugin-pwa will replace
// with the list of all your app's files (HTML, JS, CSS).
// We need it, even if we don't use it for caching,
// for the plugin to work correctly.
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST || []);

// 1. 'install' event: Activates new SW immediately
self.addEventListener("install", () => {
	self.skipWaiting();
});

// 2. 'activate' event: Takes control of open pages
self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

// 3. 'push' event: The core logic for notifications
self.addEventListener("push", (event) => {
	const payload = event.data
		? event.data.json()
		: { title: "No Title", body: "No Body" };

	// Get title and body from payload
	// (You control this JSON structure from your Express server)
	const title = payload.title || "Push Notification";
	const options: NotificationOptions = {
		body: payload.body || "Notification from Track",
		icon: "/icons/icon-192x192.png", // Default icon
		badge: "/icons/icon-badge.png", // Notification badge
		data: {
			// You can pass data to the client, e.g., a URL to open
			url: payload.url || "/",
		},
	};

	// Keep the service worker alive until notification is shown
	event.waitUntil(self.registration.showNotification(title, options));
});

// (Optional) Handle notification click
self.addEventListener("notificationclick", (event) => {
	event.notification.close(); // Close the notification

	// Open the URL specified in the 'data'
	event.waitUntil(self.clients.openWindow(event.notification.data.url));
});

// Push subscriptions expire after some time. When this happens, the endpoint
// changes, and we have to re-insert a subscription for the user, and delete the
// old one.
// @see https://pushpad.xyz/blog/web-push-error-410-the-push-subscription-has-expired-or-the-user-has-unsubscribed
self.addEventListener("pushsubscriptionchange", (event) => {
	const baseUrl = import.meta.env.DEV
		? "/api"
		: `https://${import.meta.env.VITE_DOMAIN}`;
	const endpoint = "data/push/subscriptionchange";
	const url = `${baseUrl}/${endpoint}`;

	event.waitUntil(
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				old_endpoint: event.oldSubscription
					? event.oldSubscription.endpoint
					: null,
				new_endpoint: event.newSubscription
					? event.newSubscription.endpoint
					: null,
				new_p256dh: event.newSubscription
					? event.newSubscription.toJSON().keys?.p256dh
					: null,
				new_auth: event.newSubscription
					? event.newSubscription.toJSON().keys?.auth
					: null,
			}),
		})
	);
});

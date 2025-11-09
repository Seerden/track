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
	// Get payload data
	console.log({ data: JSON.stringify(event.data) });

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

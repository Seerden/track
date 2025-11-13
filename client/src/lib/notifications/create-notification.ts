export function createNotification() {
	const notification = new Notification("Test notification", {
		body: "This is a test notification",
		requireInteraction: true,
	});
}

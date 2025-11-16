/** Request the user browser permission to send notifications. */
export async function requestPermission() {
	return await Notification.requestPermission();
}

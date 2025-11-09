export async function requestPermission() {
	const permission = await Notification.requestPermission();

	// note: do we do anything with this permission?
	return permission;
}

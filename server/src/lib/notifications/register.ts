import webpush from "web-push";

const vapidPublicKey = process.env.VITE_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

export function registerWebpush() {
	if (!vapidPublicKey || !vapidPrivateKey) {
		throw new Error("Missing vapid keys in environment.");
	}

	webpush.setVapidDetails(
		"https://github.com/seerden/track",
		vapidPublicKey,
		vapidPrivateKey
	);
}

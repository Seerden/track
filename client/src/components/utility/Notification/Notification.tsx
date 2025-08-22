import NotificationProgressBar from "@/components/utility/Notification/NotificationProgressBar";
import { useState, type PropsWithChildren } from "react";
import S from "./style/Notification.style";

export type NotificationType = "error" | "success" | "warning" | "info";

/** Renders a notification at a fixed position in the viewport that disappears
 * after `timeout` milliseconds. */
export default function Notification({
	children,
	type,
}: PropsWithChildren<{ type: NotificationType }>) {
	const timeout = 5 * 1000; // by default, notification is visible for 5 seconds

	const [isVisible, setIsVisible] = useState(true);
	function hide() {
		setIsVisible(false);
	}

	if (!isVisible) {
		return null;
	}

	return (
		<S.Container $type={type}>
			<NotificationProgressBar hide={hide} timeout={timeout} />
			{children}
		</S.Container>
	);
}

import NotificationProgressBar from "@/components/utility/Notification/NotificationProgressBar";
import { memo, useState, type PropsWithChildren } from "react";
import S from "./style/Notification.style";

export type NotificationType = "error" | "success" | "warning" | "info";

function Notification({ children, type }: PropsWithChildren<{ type: NotificationType }>) {
	const timeout = 2 * 1000; // 5 seconds;

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

export default memo(Notification);

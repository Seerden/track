import { memo, useEffect, useState, type PropsWithChildren } from "react";
import S from "./style/Notification.style";

export type NotificationType = "error" | "success" | "warning" | "info";

function useNotificationTimer(durationMs: number) {
	const [elapsed, setElapsed] = useState(0);

	const refresh = 1000 / 60; // target 60fps;

	useEffect(() => {
		if (elapsed >= durationMs) return;

		const interval = window.setInterval(() => {
			console.log("tick");
			setElapsed((current) => {
				if (current + refresh >= durationMs) {
					window.clearInterval(interval);
					return durationMs;
				}
				return current + refresh;
			});
		}, refresh);

		return () => {
			window.clearInterval(interval);
		};
	}, [elapsed, durationMs]);

	const visible = elapsed < durationMs;

	return {
		elapsed,
		visible
	};
}

function NotificationProgressBar({
	timeout,
	hide
}: {
	timeout: number;
	hide: () => void;
}) {
	const { elapsed, visible } = useNotificationTimer(timeout);

	useEffect(() => {
		if (!visible) {
			hide();
		}
	}, [visible]);

	return (
		<S.Bar
			style={{
				width: `${Math.max(0, 100 - (elapsed / timeout) * 100)}%`
			}}
		/>
	);
}

function Notification({ children, type }: PropsWithChildren<{ type: NotificationType }>) {
	const timeout = 5 * 1000; // 5 seconds;

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

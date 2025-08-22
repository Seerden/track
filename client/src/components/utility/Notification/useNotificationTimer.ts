import { useEffect, useState } from "react";

export default function useNotificationTimer(
	durationMs: number,
	handleEnd: () => void
) {
	const [elapsed, setElapsed] = useState(0);

	const refresh = 1000 / 60; // try to refresh at 60fps

	useEffect(() => {
		const interval = window.setInterval(() => {
			setElapsed((current) => current + refresh);
		}, refresh);

		if (elapsed >= durationMs) {
			window.clearInterval(interval);
		}

		return () => {
			window.clearInterval(interval);
		};
	}, [elapsed, durationMs]);

	const visible = elapsed <= durationMs;

	if (!visible) {
		handleEnd();
	}

	return {
		elapsed,
		visible,
	};
}

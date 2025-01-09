import useNotificationTimer from "@/components/utility/Notification/useNotificationTimer";
import S from "./style/NotificationProgressBar.style";

type NotificationProgressBarProps = {
	/** How long (in ms) the notification should be visible. */
	timeout: number;
	/** This is passed from Notification.tsx, it handles closing the notification. */
	hide: () => void;
};

/** Notification subcomponent that visualizes how much longer the notification
 * this is part of will be visible. */
export default function NotificationProgressBar({
	timeout,
	hide
}: NotificationProgressBarProps) {
	const { elapsed } = useNotificationTimer(timeout, hide);

	return (
		<S.Bar
			style={{
				// TODO: we should account for the offset of the progress bar,
				// currently it's off-center at 0% elapsed.
				width: `${Math.max(0, 100 - (elapsed / timeout) * 100)}%`
			}}
		/>
	);
}

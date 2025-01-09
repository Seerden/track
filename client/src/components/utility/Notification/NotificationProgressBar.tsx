import useNotificationTimer from "@/components/utility/Notification/useNotificationTimer";
import S from "./style/NotificationProgressBar.style";

type NotificationProgressBarProps = {
	timeout: number;
	hide: () => void;
};

export default function NotificationProgressBar({
	timeout,
	hide
}: NotificationProgressBarProps) {
	const { elapsed } = useNotificationTimer(timeout, hide);

	return (
		<S.Bar
			style={{
				width: `${Math.max(0, 100 - (elapsed / timeout) * 100)}%`
			}}
		/>
	);
}

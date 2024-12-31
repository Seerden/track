import { LucideChevronLeftCircle, LucideChevronRightCircle } from "lucide-react";
import S from "./style/ChangeDayButton.style";

export default function ChangeDayButton({
	type,
	onClick
}: {
	type: "next" | "previous";
	onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	// TODO: use the same buttons as we do to move back/forward a month in the Calendar.
	const Icon = type === "next" ? LucideChevronRightCircle : LucideChevronLeftCircle;

	const size = 20; // TODO: make this responsive

	return (
		<S.ChangeDayButton
			$color={"themeInverted"}
			$size={size}
			$direction={type === "next" ? "right" : "left"}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			<Icon size={size} color="white" />
		</S.ChangeDayButton>
	);
}

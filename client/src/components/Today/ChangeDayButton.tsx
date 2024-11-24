import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import S from "./style/ChangeDayButton.style";

export default function ChangeDayButton({
	type,
	onClick
}: {
	type: "next" | "previous";
	onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	const Icon = type === "next" ? MdNavigateNext : MdNavigateBefore;

	const size = 25; // TODO: make this responsive

	return (
		<S.ChangeDayButton
			$color={"darkBlue"}
			$size={size}
			$direction={type === "next" ? "right" : "left"}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			<Icon size={size} fill="white" />
		</S.ChangeDayButton>
	);
}

import styled from "@emotion/styled";
import {
	LucideChevronLeftCircle,
	LucideChevronRightCircle,
} from "lucide-react";
import { spacingValue } from "../../snippets/spacing";
import { Default } from "./Action";

const StyledChangeDayButton = styled(Default)<{
	$size: number;
	$direction: "left" | "right";
}>`
	--size: calc(${(p) => p.$size}px + 0.2rem);
	max-width: var(--size);
	max-height: var(--size);
	min-width: var(--size);
	min-height: var(--size);

	margin-top: ${spacingValue.smallest}; // slight offset makes it look more centered than actually centering it with the text

	&:hover,
	&:focus,
	&:active {
		--offset: ${spacingValue.smaller};
		--sign: ${(p) => (p.$direction === "left" ? -1 : 1)};
		transform: translateX(calc(var(--sign) * var(--offset)));
	}
`;

/**
 * @deprecated @todo this was the old button for changing the day in the
 * Calendar. Use the new DirectionButton component instead.
 */
export default function ChangeDayButton({
	type,
	onClick,
}: {
	type: "next" | "previous";
	onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	// TODO: use the same buttons as we do to move back/forward a month in the Calendar.
	const Icon =
		type === "next" ? LucideChevronRightCircle : LucideChevronLeftCircle;

	const size = 20; // TODO: make this responsive

	return (
		<StyledChangeDayButton
			type="button"
			$color={"themeInverted"}
			$size={size}
			$direction={type === "next" ? "right" : "left"}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}>
			<Icon size={size} color="white" />
		</StyledChangeDayButton>
	);
}

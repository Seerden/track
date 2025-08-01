import styled from "@emotion/styled";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import { spacingValue } from "../../snippets/spacing";
import UnstyledButton from "./Unstyled";

type DirectionButtonProps = {
	direction: "previous" | "next";
	onClick: () => void;
	size?: number;
};

const StyledDirectionButton = styled(UnstyledButton)<{
	$direction: "previous" | "next";
	$color: CSSProperties["color"];
}>`
	display: flex;
	align-items: center;
	transition: transform 50ms ease-out;

	border-bottom: 2px solid transparent;

	&:hover,
	&:active,
	&:focus {
		border-bottom-color: ${(p) => p.$color};

		--sign: ${(p) => (p.$direction === "previous" ? -1 : 1)};
		--translateOffset: ${spacingValue.tiny};
		transform: translateX(calc(var(--sign) * var(--translateOffset))) scaleX(1.05);

		svg {
			color: ${(p) => p.$color};
		}
	}
`;

export function DirectionButton({ direction, onClick }: DirectionButtonProps) {
	const Icon = direction === "next" ? LucideChevronRight : LucideChevronLeft;
	return (
		<StyledDirectionButton
			type="button"
			$color="dodgerblue"
			$direction={direction}
			onClick={onClick}
		>
			<Icon size={22} />
		</StyledDirectionButton>
	);
}

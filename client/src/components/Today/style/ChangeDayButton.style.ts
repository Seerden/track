import type { ColorKey } from "@/lib/theme/colors";
import Button from "@/lib/theme/components/Button.style";
import { styled } from "styled-components";

const color: ColorKey = "purple"; // TODO: for now, this is hardcoded. Eventually it should be dynamic.

const ChangeDayButton = styled(Button.Unstyled)<{
	$size: number;
	$direction: "left" | "right";
}>`
	cursor: pointer;
	border-radius: 50%;
	--size: calc(${(p) => p.$size}px + 0.2rem);
	min-width: var(--size);
	min-height: var(--size);

	background-color: ${(p) => p.theme.colors[color].secondary};
	box-shadow: 0 0 0.2rem 0 ${(p) => p.theme.colors[color].secondary};

	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 0.2rem; // slight offset makes it look more centered than actually centering it with the text

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) => p.theme.colors[color].main};
		transform: translateX(${(p) => (p.$direction === "left" ? "-0.3rem" : "0.3rem")});
		transition: transform 75ms ease-out;
		outline: 2px solid white;
		box-shadow: 0 0 0.3rem 0 #333;
	}
`;

export default {
	ChangeDayButton
};

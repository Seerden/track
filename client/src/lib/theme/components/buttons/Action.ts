import type { ColorKey } from "@/lib/theme/colors";
import ButtonStyle from "@/lib/theme/components/Button.style";
import styled from "styled-components";

// Adapted from ChangeDayButton
const Default = styled(ButtonStyle.Unstyled)<{ color?: ColorKey }>`
	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 50%;

	background-color: ${(p) =>
		p.color ? p.theme.colors[p.color].secondary : "transparent"};
	box-shadow: 0 0 0.2rem 0
		${(p) => (p.color ? p.theme.colors[p.color].secondary : "none")};

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) =>
			p.color ? p.theme.colors[p.color].main : "transparent"};
		outline: 2px solid white;
		box-shadow: 0 0 0.3rem 0 #333;
	}

	transition: transform 75ms ease-out;

	// Generic defaults
	color: white;
	width: 50px;
	height: 50px;
`;

Default.defaultProps = {
	type: "button",
	color: "purple"
};

const ActionButtons = {
	Default
};

export default ActionButtons;

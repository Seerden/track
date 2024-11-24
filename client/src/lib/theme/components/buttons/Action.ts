import type { ColorKey } from "@/lib/theme/colors";
import UnstyledButton from "@/lib/theme/components/buttons/Unstyled";
import styled from "styled-components";

// Adapted from ChangeDayButton
const Default = styled(UnstyledButton)<{ color?: ColorKey }>`
	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 50%;

	background-color: ${(p) => (p.color ? p.theme.colors[p.color].main : "transparent")};
	box-shadow: 0 0 0.2rem 0 ${(p) => (p.color ? p.theme.colors[p.color].main : "none")};

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) =>
			p.color ? p.theme.colors[p.color].secondary : "transparent"};
		outline: 2px solid white;
		box-shadow: 0 0 0.3rem 0 #333;
	}

	transition: transform 75ms ease-out;

	// Generic defaults
	color: white;
	width: 30px;
	height: 30px;
`;

Default.defaultProps = {
	type: "button",
	color: "purple"
};

// Adapted from DropdownTrigger in TagSelector
const Alternative = styled(UnstyledButton)<{ color?: ColorKey }>`
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 50%;

	--size: 30px; // TODO: use size from props by default, otherwise default to 30px
	width: var(--size);
	height: var(--size);

	&:active {
		transform: scale(1.1);
		background-color: white;
		& > svg {
			fill: black;
		}
	}

	&:focus:not(:active) {
		outline: 1px solid #ccc; // TODO: need this to be a generic focusOutline snippet, because buttons and inputs all need this
		background-color: #fff;
	}

	&:hover {
		background-color: #fafafa;
		outline: 2px solid #fff;
		box-shadow: 0 0.1rem 0.4rem 0 #ccc;
	}
`;

const ActionButtons = {
	Default,
	Alternative
};

export default ActionButtons;

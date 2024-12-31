import { getMainColor, getSecondaryColor, type ColorKey } from "@/lib/theme/colors";
import Unstyled from "@/lib/theme/components/buttons/Unstyled";
import styled from "styled-components";
import type { CSS } from "styled-components/dist/types";

const Default = styled(Unstyled)<{ $color?: ColorKey }>`
	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 50%;

	background-color: ${(p) => (p.$color ? p.theme.colors[p.$color].main : "transparent")};
	box-shadow: 0 0 0.2rem 0 ${(p) => (p.$color ? p.theme.colors[p.$color].main : "none")};

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) =>
			p.$color ? p.theme.colors[p.$color].secondary : "transparent"};
		outline: 2px solid white;
		box-shadow: 0 0 0.3rem 0 #333;
	}

	transition: transform 75ms ease-out;

	// Generic defaults
	color: white;
	width: 30px;
	height: 30px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

Default.defaultProps = {
	type: "button",
	$color: "purple"
};

const Alternative = styled(Unstyled)`
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

const Stylized = styled(Unstyled)<{
	$size?: CSS.Properties["width"];
	$color: ColorKey;
}>`
	--color: ${(p) => p.$color ?? "themeInverted"};

	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: white;

	outline: 2px solid ${(p) => getMainColor(p.theme, p.$color)};
	border: 2px solid #eee;
	box-shadow: 0 0.2rem 0.5rem 0 #bbb;
	background-color: ${(p) => getMainColor(p.theme, p.$color)};

	svg {
		color: white;
	}

	&:hover {
		outline: 2px solid ${(p) => getSecondaryColor(p.theme, p.$color)};
		background-color: ${(p) => getSecondaryColor(p.theme, p.$color)};
		border-radius: 5px;
	}

	transition: all linear 50ms;

	--default-edit-button-size: 35px;
	width: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
	height: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
`;

Stylized.defaultProps = {
	$color: "themeInverted"
};

const WithIcon = styled(Default)`
	width: max-content;
	border-radius: 10px;
	margin-left: 1rem;
	padding: 1.5rem 2.5rem;
	color: white;
	display: flex;
	gap: 1rem;
`;

const CallToAction = styled(WithIcon)`
	padding: 1.5rem 1rem;
	border-radius: 3px;
	color: black;

	// Regular margin
	margin-top: -0.5rem;
	margin-left: auto;
	margin-right: 4rem;

	// Small-screen margin
	@media (max-width: 768px) {
		margin: 0;
		margin-top: 1rem;
	}
`;

const ActionButtons = {
	Default,
	Alternative,
	Stylized,
	WithIcon,
	CallToAction
};

export default ActionButtons;

import { getMainColor, getSecondaryColor, type ColorKey } from "@/lib/theme/colors";
import Unstyled from "@/lib/theme/components/buttons/Unstyled";
import { border, outline, thinOutline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

const _Default = styled(Unstyled)<{ $color?: ColorKey }>`
	${flex.centered};
	${radius.round};

	background-color: ${(p) => (p.$color ? p.theme.colors[p.$color].main : "transparent")};
	box-shadow: 0 0 0.2rem 0 ${(p) => (p.$color ? p.theme.colors[p.$color].main : "none")};

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) =>
			p.$color ? p.theme.colors[p.$color].secondary : "transparent"};
		${outline.primary};
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

function Default(props: Parameters<typeof _Default>[0]) {
	return <_Default type="button" $color="purple" {...props} />;
}

const Alternative = styled(Unstyled)`
	${flex.centered};
	${radius.round};

	--size: 30px; // TODO: use size from props by default, otherwise default to 30px
	width: var(--size);
	height: var(--size);

	&:active {
		transform: scale(1.1);
		background-color: white;
	}

	// TODO: need this to be a generic focusOutline snippet, because buttons
	// and inputs all need this
	&:focus:not(:active) {
		${thinOutline.grey};
		background-color: #fff;
	}

	&:hover {
		// TODO TRK-231: use a color from the theme, or add this to it
		background-color: #fafafa;
		${outline.primary};
		box-shadow: 0 0.1rem 0.4rem 0 #ccc;
	}
`;

const _Stylized = styled(Unstyled)<{
	$size?: CSSProperties["width"];
	$color: ColorKey;
}>`
	--color: ${(p) => p.$color ?? "themeInverted"};

	${flex.centered};
	${radius.round};
	color: white;

	/* TODO: we're using getMainColor for the outline and background, but not the
      border and shadow. Does that not look ugly for some $color values? */
	outline: 2px solid ${(p) => getMainColor(p.theme, p.$color)};
	${border.secondary};
	box-shadow: 0 0.2rem 0.5rem 0 #bbb;
	background-color: ${(p) => getMainColor(p.theme, p.$color)};

	svg {
		color: white;
	}

	&:hover {
		outline: 2px solid ${(p) => getSecondaryColor(p.theme, p.$color)};
		background-color: ${(p) => getSecondaryColor(p.theme, p.$color)};
		${radius.medium}
	}

	transition: all linear 50ms;

	--default-edit-button-size: 35px;
	width: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
	height: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
`;

function Stylized(props: Parameters<typeof _Stylized>[0]) {
	return <_Stylized type="button" {...props} />;
}

const WithIcon = styled(_Default)`
	display: flex;
	width: max-content;
	color: white;

	${radius.large};
	margin-left: 1rem;
	padding: 1.5rem 2.5rem;
	gap: ${spacingValue.medium};
`;

const CallToAction = styled(WithIcon)`
	padding: 1.5rem 1rem;
	${radius.small};
	color: black;

	margin-top: -0.5rem;
	margin-left: auto;
	margin-right: 4rem;

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

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import type { ColorKey } from "@/lib/theme/colors";
import Unstyled from "@/lib/theme/components/buttons/Unstyled";
import { font } from "@/lib/theme/font";
import { border, outline, thinOutline } from "@/lib/theme/snippets/edge";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import Active from "../../snippets/active";
import { DirectionButton } from "./Direction";

export const Default = styled(Unstyled)<{
	$color?: ColorKey;
	$minimal?: boolean;
}>`
	${flex.centered};
	${radius.round};

	--color: ${(p) => (p.$minimal ? "#eee" : p.$color)};
	background-color: var(--color);
	box-shadow: 0 0 0.2rem 0 var(--color);

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) =>
			p.$minimal ? "#eee" : (p.$color ?? "transparent")};
		${outline.primary};
		box-shadow: ${(p) => (p.$minimal ? "none" : `0 0 0.3rem 0 #333`)};
	}

	transition: transform 75ms ease-out;

	// Generic defaults
	color: ${(p) => p.theme.colors.text.contrast[0]};
	width: 30px;
	height: 30px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

   ${(p) =>
			p.$minimal &&
			css`
            color: ${p.theme.colors.background.contrast[0]};
            box-shadow: none;

            .lucide {
               color: ${p.theme.colors.background.contrast[0]};
            }
      `}
`;

const Alternative = styled(Unstyled)<{ light?: boolean }>`
	${flex.centered};
	${radius.round};

	${(p) =>
		p.light &&
		css`
			background-color: ${p.theme.colors.background.main[0]};
;
		`}

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
		background-color: ${(p) => p.theme.colors.background.main[0]};
;
	}

	&:hover {
		background-color: ${(p) => p.theme.colors.background.main[1]};
		${outline.primary};
		box-shadow: 0 0.1rem 0.4rem 0 #ccc;
	}
`;

// TODO: this thing is SO ugly.
const Stylized = styled(Unstyled)<{
	$size?: CSSProperties["width"];
	$color: ColorKey;
}>`
	--color: ${(p) => p.$color ?? "blue"};
   
	${flex.centered};
	${radius.round};
	color: white;
   
	/* TODO: we're using getMainColor for the outline and background, but not the
   border and shadow. Does that not look ugly for some $color values? */
   /* TODO: redo this getMainColor thing */
	outline: 2px solid var(--color);
	${border.secondary};
	box-shadow: 0 0.2rem 0.5rem 0 #aaa;
	background-color: var(--color);

	svg {
		color: white;
	}

	&:hover:not(:disabled) {
		/* TODO: go one tint lighter or darker. Requires another rework of
		ColorKey though. */
      outline: 3px solid var(--color);
		${radius.medium}
	}

	transition: all linear 50ms;

	--default-edit-button-size: 35px;
	width: ${(p) => p.$size ?? "var(--default-edit-button-size)"};
	height: ${(p) => p.$size ?? "var(--default-edit-button-size)"};

   &:disabled {
      opacity: 0.6;
      box-shadow: none;
      cursor: not-allowed;
   }
`;

const WithIcon = styled(Default)`
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
	color: #000;

	margin-top: -0.5rem;
	margin-left: auto;
	margin-right: 4rem;

	@media (max-width: 768px) {
		margin: 0;
		margin-top: 1rem;
	}
`;

const Clear = styled(Unstyled)`
	${radius.round};
	${flex.centered};

	.lucide {
		color: orangered;
	}

	&:disabled {
		cursor: unset;

		.lucide {
			color: #ccc;
		}
	}

	${Active.default};
`;

const DefaultText = styled(Default)`
   width: max-content;
   ${radius.small};
   padding-inline: ${spacingValue.small};
   font-size: ${font.size["0.9"]};
`;

const Minimal = styled(Unstyled)`
   --color: ${(p) => p.theme.colors.light[3]};
   color: ${(p) => p.theme.colors.dark[0]};
   outline: 2px solid var(--color);
   padding: ${spacingValue.smaller} ${spacingValue.medium};
   border-radius: 2px;
   width: max-content;
   background-color: var(--color);
   font-size: ${font.size["0.93"]};

   /* TODO: implement interaction styles for this button */
   &:hover, &:active, &:focus {
      // manually overwrite these from Unstyled for selectivity
      outline: 2px solid #eee;
   }
`;

const ActionButtons = {
	Default,
	DefaultText,
	Alternative,
	Stylized,
	WithIcon,
	CallToAction,
	Clear,
	Direction: DirectionButton,
	Minimal,
};

export default ActionButtons;

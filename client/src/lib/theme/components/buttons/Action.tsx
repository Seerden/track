import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { type ColorKey, colors } from "@/lib/theme/colors";
import Unstyled from "@/lib/theme/components/buttons/Unstyled";
import { font } from "@/lib/theme/font";
import { lightDark } from "@/lib/theme/light-dark";
import { flex } from "@/lib/theme/snippets/flex";
import { radius } from "@/lib/theme/snippets/radius";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { DirectionButton } from "./Direction";

export const Default = styled(Unstyled)<{
	$color?: ColorKey;
	$interactionColor?: ColorKey;
	$minimal?: boolean;
}>`
	${flex.centered};
	${radius.round};

   --color-text: ${(p) => p.theme.colors.text.main[3]};
	--color-background: ${(p) => (p.$minimal ? p.theme.colors.background.main[3] : p.$color)};

	background-color: var(--color-background);
	box-shadow: 0 0 0.3rem -0.1rem var(--color-background);

   .lucide {
      color: var(--color-background);
   }

	&:hover,
	&:focus,
	&:active {
		background-color: ${(p) => p.$interactionColor ?? p.theme.colors.background.main[1]};
		outline: 2px solid ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 0 : 3]};
		box-shadow: 0 0.1rem 0.4rem 0 ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 5 : 0]};

      ${(p) =>
				!p.$interactionColor &&
				css`
               color: var(--color-text);
               .lucide {
                  color: var(--color-text);
               }
            `}
	}

	transition: transform 75ms ease-out;

	// Generic defaults
	color: var(--color-text);
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
			background-color: ${p.theme.colors.background.main[p.theme.mode === "light" ? 0 : 3]};
;
		`}

	--size: 30px; // TODO: use size from props by default, otherwise default to 30px
	width: var(--size);
	height: var(--size);

	&:hover, &:focus, &:active {
      outline: 2px solid ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 4 : 3]};
		background-color: ${(p) => p.theme.colors.background.main[1]};
		outline: 2px solid ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 0 : 3]};
		box-shadow: 0 0.1rem 0.4rem 0 ${(p) => p.theme.colors.background.main[p.theme.mode === "light" ? 5 : 0]};
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
	color: ${(p) => p.theme.colors.text.contrast[0]};
   
	/* TODO: we're using getMainColor for the outline and background, but not the
   border and shadow. Does that not look ugly for some $color values? */
   /* TODO: redo this getMainColor thing */
	outline: 2px solid var(--color);
	border: 2px solid #eee;
	box-shadow: 0 0.2rem 0.5rem 0 ${(p) => lightDark(p, p.theme.colors.background.main[6], p.theme.colors.background.main[1])};
	background-color: var(--color);

	.lucide {
		color: ${(p) => p.theme.colors.text.contrast[0]};
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
	
	${radius.large};
	padding: 1.5rem 2.5rem;
	gap: ${spacingValue.medium};
`;

const CallToAction = styled(WithIcon)`
	padding: 1.5rem 1rem;
	${radius.small};

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
			color: ${(p) => p.theme.colors.light[3]};
		}
	}
`;

const DefaultText = styled(Default)`
   width: max-content;
   ${radius.small};
   padding-inline: ${spacingValue.small};
   font-size: ${font.size["0.9"]};
`;

const Minimal = styled(Unstyled)`
   cursor: pointer;
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
      outline: 2px solid var(--color);
   }

   &:disabled {
      cursor: default;
      --color: ${(p) => p.theme.colors.light[5]};
   }
`;

const MinimalPlus = styled(Minimal)`
   transition: all 35ms ease-out;

   --highlight-color: ${(p) => p.theme.colors.purple.tertiary};

   &:not(:disabled) {
      box-shadow: 0 0.5rem 0 -0.3rem #ccc;

      &:hover, &:active, &:focus {
         box-shadow: 0 0.6rem 0 -4px var(--highlight-color), 0 0.3rem 0 0 #ccc, 0 0.5rem 0.4rem -0.2rem ${colors.dark[3]};
         transform: translateY(-2px);
      }
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
	MinimalPlus,
};

export default ActionButtons;

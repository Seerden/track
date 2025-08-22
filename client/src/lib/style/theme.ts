import { colors } from "@/lib/theme/colors";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";
import { css } from "@emotion/react";

const constants = {} as const;

const global = css`
	:root {
		--page-padding: ${spacingValue.medium};
		@media (min-width: 768px) {
			--page-padding: ${spacingValue.larger};
		}

		/* TODO TRK-231: mantine is not part of this project, but I'm considering
         using it, so might as well leave this in here for now.  */
		--mantine-font-family: $fonts; // this comes from index.scss I think
		--mantine-font-size-md: 1rem;
		--mantine-line-height: unset;
		--mantine-color-body: ${colors.theme.main};
		--mantine-color-text: black;
	}
`;

export const theme = {
	colors,
	constants,
	global,
	font,
} as const;

export type MainTheme = typeof theme;

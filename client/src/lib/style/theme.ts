import { css } from "@emotion/react";
import { colors, darkColors } from "@/lib/theme/colors";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const constants = {} as const;

const lightBody = css`
   color: ${colors.text.main[0]};
   background-color: ${colors.background.main[0]};
`;

const darkBody = css`
   color: ${darkColors.text.main[0]};
   background-color: ${darkColors.background.body};
`;

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
		--mantine-color-body: ${colors.background.main[2]};
		--mantine-color-text: ${colors.text.main[0]};
	}

   body {
      ${lightBody};
   	margin: 0;
   	padding: 0;
   }
`;

const globalDark = css`
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
		--mantine-color-body: ${darkColors.background.main[2]};
		--mantine-color-text: ${darkColors.text.main[0]};
	}

   body {
      ${darkBody};
   	margin: 0;
   	padding: 0;
   }
`;

export const lightTheme = {
	colors,
	constants,
	global,
	font,
	mode: "light",
} as const;

export const darkTheme = {
	colors: darkColors,
	constants,
	global: globalDark,
	font,
	mode: "dark",
} as const;

export type MainTheme = typeof lightTheme | typeof darkTheme;

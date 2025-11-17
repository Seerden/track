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
   color: ${colors.text.contrast[0]};
   background-color: ${colors.background.contrast[0]};
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
		--mantine-color-body: #f2f2f2;
		--mantine-color-text: #000;
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
		--mantine-color-body: #f2f2f2;
		--mantine-color-text: #000;
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
} as const;

export const darkTheme = {
	colors: darkColors,
	constants,
	global: globalDark,
	font,
};

export type MainTheme = typeof lightTheme | typeof darkTheme;

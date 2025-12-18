import { css } from "@emotion/react";
import { colors, darkColors } from "@/lib/theme/colors";
import { font } from "@/lib/theme/font";
import { spacingValue } from "@/lib/theme/snippets/spacing";

const constants = {} as const;

const global = css`
   :root {
      --header-height: 5.3rem;
      --footer-height: 80px;
      --bg-body: ${colors.background.main[2]};
      --page-padding: ${spacingValue.medium};
		@media (min-width: 768px) {
         --page-padding: ${spacingValue.larger};
		}
      
		/* TODO TRK-231: mantine is not part of this project, but I'm considering
      using it, so might as well leave this in here for now.  */
		--mantine-font-family: $fonts; // this comes from index.scss I think
		--mantine-font-size-md: 1rem;
		--mantine-line-height: unset;
		--mantine-color-body: var(--bg-body);
		--mantine-color-text: ${colors.text.main[0]};
	}
   
   body {
      background-color: var(--bg-body);
      color: ${colors.text.main[0]};
   	margin: 0;
   	padding: 0;
   }
   
   #root {  
      display: flex;
      flex-direction: column;
      min-height: calc(100dvh);

      footer {
         margin-top: auto;
      }
   }
`;

const globalDark = css`
   :root {
      --header-height: 5.3rem;
      --footer-height: 80px;
      --bg-body: ${darkColors.background.body};
		--page-padding: ${spacingValue.medium};
		@media (min-width: 768px) {
			--page-padding: ${spacingValue.larger};
		}

		/* TODO TRK-231: mantine is not part of this project, but I'm considering
         using it, so might as well leave this in here for now.  */
		--mantine-font-family: $fonts; // this comes from index.scss I think
		--mantine-font-size-md: 1rem;
		--mantine-line-height: unset;
		--mantine-color-body: var(--bg-body, red);
		--mantine-color-text: ${darkColors.text.main[0]};
	}

   #root {  
      display: flex;
      flex-direction: column;
      min-height: calc(100dvh);

      footer {
         margin-top: auto;
      }
   }

   body {
      background-color: var(--bg-body);
      color: ${darkColors.text.main[0]};
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

export const globalShadows = ({ theme }: { theme: MainTheme }) => css`
   :root {
      /* --bg-body: ${
				theme.mode === "light"
					? theme.colors.background.main[1]
					: theme.colors.background.body
			}; */
      
      --bg-0-1: ${theme.colors.background.main[theme.mode === "light" ? 0 : 1]};
      --bg-0-2: ${theme.colors.background.main[theme.mode === "light" ? 0 : 2]};
      --bg-0-3: ${theme.colors.background.main[theme.mode === "light" ? 0 : 3]};
      --bg-1-0: ${theme.colors.background.main[theme.mode === "light" ? 1 : 0]};
      --bg-1-2: ${theme.colors.background.main[theme.mode === "light" ? 1 : 2]};
      --bg-1-3: ${theme.colors.background.main[theme.mode === "light" ? 1 : 3]};
      --bg-2-1: ${theme.colors.background.main[theme.mode === "light" ? 2 : 1]};
      --bg-3-1: ${theme.colors.background.main[theme.mode === "light" ? 3 : 1]};
      --bg-3-2: ${theme.colors.background.main[theme.mode === "light" ? 3 : 2]};
      --bg-3-4: ${theme.colors.background.main[theme.mode === "light" ? 3 : 4]};
      --bg-4-1: ${theme.colors.background.main[theme.mode === "light" ? 4 : 1]};
      --bg-4-2: ${theme.colors.background.main[theme.mode === "light" ? 4 : 2]};
      --bg-4-3: ${theme.colors.background.main[theme.mode === "light" ? 4 : 3]};
      --bg-5-0: ${theme.colors.background.main[theme.mode === "light" ? 5 : 0]};
      --bg-5-1: ${theme.colors.background.main[theme.mode === "light" ? 5 : 1]};
      --bg-5-2: ${theme.colors.background.main[theme.mode === "light" ? 5 : 2]};
      --bg-5-3: ${theme.colors.background.main[theme.mode === "light" ? 5 : 3]};
      --bg-5-4: ${theme.colors.background.main[theme.mode === "light" ? 5 : 4]};

      --text-main-0: ${theme.colors.text.main[0]};
      --text-main-1: ${theme.colors.text.main[1]};
      --text-main-2: ${theme.colors.text.main[2]};
      --text-contrast-0: ${theme.colors.text.contrast[0]};
      --text-contrast-1: ${theme.colors.text.contrast[1]};
      --text-contrast-2: ${theme.colors.text.contrast[2]};
   }
`;

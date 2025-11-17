import { css } from "@emotion/react";
import type { CSSProperties } from "react";
import type { MainTheme } from "@/lib/style/theme";
import { lightDark } from "@/lib/theme/light-dark";
import { radius } from "@/lib/theme/snippets/radius";

// TODO: this is used in HabitCalendar too, so probably rename it to
// actionDropdownStyle or something.
export const actionDropdownStyle = {
	boxShadow: "0 0.2rem 0.3rem -0.1rem #888",
	backgroundColor: "#ddd",
} as CSSProperties;

export const menuDropdownStyle = ({ theme }: { theme: MainTheme }) => css`
   ${radius.large};
   border: 2px solid ${theme.colors.background.main[2]};
   outline: 2px solid ${theme.colors.background.main[3]};
   
   --shadow-color: ${lightDark({ theme }, theme.colors.background.main[5], theme.colors.background.main[1])};

   box-shadow:
		0 0.2rem 0.1rem 0 var(--shadow-color),
		0 0.3rem 1rem 0 var(--shadow-color);
`;

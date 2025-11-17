import { css } from "@emotion/react";
import type { CSSProperties } from "react";
import { border, outline } from "@/lib/theme/snippets/edge";
import { radius } from "@/lib/theme/snippets/radius";

// TODO: this is used in HabitCalendar too, so probably rename it to
// actionDropdownStyle or something.
export const actionDropdownStyle = {
	boxShadow: "0 0.2rem 0.3rem -0.1rem #888",
	backgroundColor: "#ddd",
} as CSSProperties;

export const menuDropdownStyle = css`
   ${radius.large};
   ${border.primary};
   ${outline.grey};
   
   box-shadow:
		0 0.2rem 0.1rem 0 #aaa,
		0 0.3rem 1rem 0 #aaa;
`;

import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { colors } from "@/lib/theme/colors";
import Floating from "@/lib/theme/components/containers/floating.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";

const List = styled.ul<{ $itemCount: number }>`
	width: 100%;

   gap: 0.8rem;
   
	${flex.row};
`;

// TODO: this thing is useless now, just use Floating.Wrapper if anything.
const FloatingWrapper = styled(Floating.Wrapper)``;

export default { List, FloatingWrapper };

export const completionTooltipStyles = {
	regular: {
		borderRadius: 2,
		// TODO: make this theme aware:
		// 1. make this a function that takes the theme from the atom
		// 2. turn tooltip elements into styled components so we can use the theme
		//    color
		backgroundColor: "var(--bg-1-2)",
		color: "var(--text-main-0)",
		fontSize: font.size["0.9"],
		padding: "0.3rem 0.6rem",
		outline: "1px solid var(--bg-4-3)",
		boxShadow: `
         0 0.4rem 0 -0.2rem var(--bg-4-3),
         0 0.2rem 0.3rem 0 var(--bg-5-2)`,
	},
	alternate: {
		position: "absolute",
		top: 0,
		padding: "0.4rem 0.5rem",
		borderRadius: "3px",
		left: 0,
		fontSize: font.size["0.82"],
		maxWidth: "300px",
		backgroundColor: "royalblue",
		color: colors.light[0],
		display: "inline-flex",
		flexWrap: "wrap",
	},
} as const satisfies Record<string, CSSProperties>;

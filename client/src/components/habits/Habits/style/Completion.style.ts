import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import Floating from "@/lib/theme/components/containers/floating.style";
import { font } from "@/lib/theme/font";
import { flex } from "@/lib/theme/snippets/flex";

const List = styled.ul<{ $itemCount: number }>`
	width: 100%;

   gap: 0.8rem;
   
	${flex.row};
`;

const FloatingWrapper = styled(Floating.Wrapper)`
	* {
		/* This makes sure the background of each Slider completion entry is
		      visible. */
		--slider-track-bg: #aaa;
	}
`;

export default { List, FloatingWrapper };

export const completionTooltipStyles = {
	regular: {
		borderRadius: 0,
		backgroundColor: "#f7f7f7",
		color: "black",
		borderEndEndRadius: "3px",
		fontSize: font.size["0.9"],
		padding: "0.3rem 0.6rem",
		outline: "1px solid #aaa",
		boxShadow: `
         0 0.4rem 0 -0.2rem #ddd,
         0 0.2rem 0.3rem 0 #aaa`,
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
		color: "white",
		display: "inline-flex",
		flexWrap: "wrap",
	},
} as const satisfies Record<string, CSSProperties>;

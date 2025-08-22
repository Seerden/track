import Floating from "@/lib/theme/components/containers/floating.style";
import { flex } from "@/lib/theme/snippets/flex";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";

const List = styled.ul<{ $itemCount: number }>`
	width: 100%;
	gap: 0.8rem;

	${flex.row};

	flex-wrap: nowrap;
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
		fontSize: "0.88rem",
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
		fontSize: "0.8rem",
		maxWidth: "300px",
		backgroundColor: "royalblue",
		color: "white",
		display: "inline-flex",
		flexWrap: "wrap",
	},
} as const satisfies Record<string, CSSProperties>;
